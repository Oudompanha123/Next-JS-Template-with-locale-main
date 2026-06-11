export type ApiStatus = {
	code: number;
	message: string;
};

export type ApiResponse<TData = Record<string, unknown>> = {
	data: TData;
	status: ApiStatus;
};