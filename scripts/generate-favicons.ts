/**
 * Generates favicon PNGs, favicon.ico, and site.webmanifest from the source logo JPEG in public/.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const srcImage = join(publicDir, 'WhatsApp Image 2026-05-10 at 17.15.09.jpeg');

const SITE_NAME = 'C&S Partners';
const SHORT_NAME = 'C&S Partners';
const START_URL = '/';
const THEME_COLOR = '#ffffff';
const BACKGROUND_COLOR = '#ffffff';

async function squarePng(size: number): Promise<Buffer> {
	return sharp(srcImage)
		.resize(size, size, { fit: 'cover', position: 'centre' })
		.png()
		.toBuffer();
}

async function main() {
	const favicon16 = await squarePng(16);
	const favicon32 = await squarePng(32);
	const favicon48 = await squarePng(48);
	writeFileSync(join(publicDir, 'favicon-16x16.png'), favicon16);
	writeFileSync(join(publicDir, 'favicon-32x32.png'), favicon32);

	const ico = await pngToIco([favicon16, favicon32, favicon48]);
	writeFileSync(join(publicDir, 'favicon.ico'), ico);

	writeFileSync(join(publicDir, 'apple-touch-icon.png'), await squarePng(180));
	writeFileSync(join(publicDir, 'icon-192.png'), await squarePng(192));
	writeFileSync(join(publicDir, 'icon-512.png'), await squarePng(512));

	const manifest = {
		name: SITE_NAME,
		short_name: SHORT_NAME,
		start_url: START_URL,
		scope: '/',
		display: 'browser',
		background_color: BACKGROUND_COLOR,
		theme_color: THEME_COLOR,
		icons: [
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable',
			},
		],
	};

	writeFileSync(join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

	console.log('Wrote favicon.ico, PNG icons, and site.webmanifest under public/');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
