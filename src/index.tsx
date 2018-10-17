import * as React from "react";
import { FetchStatus } from "./enums";
import { IReactAsyncDataProps, ReactAsyncDataState } from "./types";

export default class ReactAsyncData<TData> extends React.Component<
	IReactAsyncDataProps<TData>,
	ReactAsyncDataState<TData>
> {
	private timer?: NodeJS.Timer | null;
	constructor(props: IReactAsyncDataProps<TData>) {
		super(props);
		this.getData = this.getData.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.safeStopTimer = this.safeStopTimer.bind(this);

		this.state = {
			status: FetchStatus.Loading,
			fetchId: props.fetchId
		};
	}

	async componentDidMount() {
		const { timeout } = this.props;
		if (timeout) {
			this.startTimer(timeout);
		} else {
			this.getData();
		}
	}

	componentWillUnmount() {
		this.safeStopTimer();
	}

	async componentWillReceiveProps({
		fetchId,
		timeout
	}: IReactAsyncDataProps<TData>) {
		const { fetchId: currentFetchId } = this.state;
		if (fetchId !== currentFetchId) {
			this.setState({ fetchId });
			await this.getData();
		}
		if (!this.timer && timeout) {
			this.startTimer(timeout);
		} else if (this.timer && !timeout) {
			this.safeStopTimer();
		}
	}

	startTimer(timeout: number) {
		this.getData();
		this.timer = setInterval(async () => await this.getData(), timeout);
	}

	safeStopTimer() {
		if (!this.timer) {
			return;
		}
		clearInterval(this.timer);
		this.timer = null;
	}

	async getData() {
		const { fetch } = this.props;
		this.setState({ status: FetchStatus.Loading, error: undefined });
		try {
			const data = await fetch();
			this.setState({ data, status: FetchStatus.Completed });
		} catch (error) {
			this.setState({
				error,
				status: FetchStatus.Error,
				data: undefined
			});
		}
	}

	render() {
		const { children } = this.props;
		const { data, status } = this.state;

		if (!children) {
			return null;
		}

		return children({
			data,
			status
		});
	}
}
