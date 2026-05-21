export type SanityRevalidatePayload = {
	paths?: string[];
};

export type RevalidateFailure = {
	path: string;
	error: string;
};

export type RevalidateResult = {
	revalidated: string[];
	failed: RevalidateFailure[];
};
