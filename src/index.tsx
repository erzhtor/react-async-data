import * as React from "react";
import { IReactAsyncDataProps, ReactAsyncDataState } from "./types";

export default class ReactAsyncData<TData> extends React.Component<
	IReactAsyncDataProps<TData>,
	ReactAsyncDataState<TData>
> {
	state: ReactAsyncDataState<TData> = {
		loading: true
	};

	constructor(props: IReactAsyncDataProps<TData>) {
		super(props);
		this.getData = this.getData.bind(this);
	}

	async componentWillMount() {
		const { timeout } = this.props;
		if (timeout) {
			setInterval(async () => await this.getData(), timeout);
		} else {
			this.getData();
		}
	}

	async getData() {
		const { fetch } = this.props;
		try {
			const data = await fetch();
			this.setState({ data, loading: false });
		} catch (error) {
			this.setState({ error });
		}
	}

	render() {
		const { children } = this.props;
		const { data, loading, error } = this.state;
		return children({
			data,
			loading,
			error
		});
	}
}
