type FetchId = number | string | boolean | null;

export interface IReactAsyncDataProps<TData> {
	timeout?: number;
	fetchId?: FetchId;
	fetch: () => Promise<TData>;
	children: (
		args: {
			loading: boolean;
			error?: any;
			data?: TData;
		}
	) => React.ReactNode;
}

export type ReactAsyncDataState<TData> = {
	data?: TData;
	loading: boolean;
	error?: any;
	timer?: NodeJS.Timer | null;
	fetchId?: FetchId;
};
