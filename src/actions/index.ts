import * as Sentry from '@sentry/astro';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { checkBotId } from 'botid/server';
import { Resend } from 'resend';

function headersForBotId(request: Request): Record<string, string> {
	const out: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		out[key.toLowerCase()] = value;
	});
	return out;
}

export const server = {
	contact: defineAction({
		accept: 'form',
		input: z.object({
			name: z.string().max(200).nullable().optional(),
			mobile: z.string().min(1).max(50),
			email: z.email(),
			message: z.string().max(10000).nullable().optional(),
			source: z
				.string()
				.nullable()
				.optional()
				.transform((s) => (s === 'internship' ? ('internship' as const) : undefined)),
		}),
		handler: async (input, context) => {
			const sourceTag = input.source === 'internship' ? 'internship' : 'contact';

			try {
				const verification = await checkBotId({
					developmentOptions: import.meta.env.DEV
						? { isDevelopment: true }
						: undefined,
					advancedOptions: {
						headers: headersForBotId(context.request),
					},
				});

				if (verification.isBot && !verification.isVerifiedBot) {
					throw new ActionError({
						code: 'FORBIDDEN',
						message: 'Unable to submit this form.',
					});
				}
			} catch (e) {
				if (e instanceof ActionError) throw e;
				console.error('[contact] BotID check failed:', e);
				Sentry.captureException(e instanceof Error ? e : new Error(String(e)), {
					tags: {
						action: 'contact',
						'form.source': sourceTag,
						'failure.stage': 'botid',
					},
				});
				throw new ActionError({
					code: 'FORBIDDEN',
					message: 'Unable to verify this submission.',
				});
			}

			const to = import.meta.env.CONTACT_EMAIL_TO;
			const from = import.meta.env.CONTACT_EMAIL_FROM;
			const apiKey = import.meta.env.RESEND_API_KEY;

			if (!to?.trim() || !from?.trim() || !apiKey?.trim()) {
				console.error(
					'[contact] Missing CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM, or RESEND_API_KEY',
				);
				Sentry.captureMessage(
					'Contact action: missing CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM, or RESEND_API_KEY',
					{
						level: 'error',
						tags: {
							action: 'contact',
							'form.source': sourceTag,
							'failure.stage': 'config',
						},
					},
				);
				throw new ActionError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Submissions are temporarily unavailable.',
				});
			}

			const name = (input.name ?? '').trim() || '(no name)';
			const message = (input.message ?? '').trim() || '(no message)';
			const source = input.source === 'internship' ? 'internship' : 'contact';
			const subject =
				source === 'internship' ? `Internship inquiry: ${name}` : `Website contact: ${name}`;

			const resend = new Resend(apiKey);
			const { error } = await resend.emails.send({
				from: from.trim(),
				to: [to.trim()],
				replyTo: input.email,
				subject,
				text: [
					`Source: ${source}`,
					`Name: ${name}`,
					`Email: ${input.email}`,
					`Mobile: ${input.mobile}`,
					'',
					message,
				].join('\n'),
			});

			if (error) {
				console.error('[contact] Resend error:', error);
				const errMessage =
					error &&
					typeof error === 'object' &&
					'message' in error &&
					typeof (error as { message: unknown }).message === 'string'
						? (error as { message: string }).message
						: 'Resend returned an error';
				Sentry.captureMessage(`Resend error: ${errMessage}`, {
					level: 'error',
					tags: {
						action: 'contact',
						'form.source': sourceTag,
						'failure.stage': 'resend',
					},
				});
				throw new ActionError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Could not send your message. Please try again later.',
				});
			}

			return { ok: true as const };
		},
	}),
};
