import * as React from "react";
import { FetchStatus } from "./enums";

type FetchId = number | string | boolean | null;

export interface IReactAsyncDataProps<TData> {
	timeout?: number;
	fetchId?: FetchId;
	fetch: () => Promise<TData>;
	children?: (
		args: {
			status: FetchStatus;
			data?: TData;
		}
	) => React.ReactNode;
}

export type ReactAsyncDataState<TData> = {
	data?: TData;
	status: FetchStatus;
	error?: any;
	fetchId?: FetchId;
};
