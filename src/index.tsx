import * as React from "react";
import { IReactAsyncDataProps, ReactAsyncDataState } from "./types";

export default class ReactAsyncData<TData> extends React.Component<
	IReactAsyncDataProps<TData>,
	ReactAsyncDataState<TData>
> {
	constructor(props: IReactAsyncDataProps<TData>) {
		super(props);
		this.getData = this.getData.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.safeStopTimer = this.safeStopTimer.bind(this);

		this.state = {
			loading: true,
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
		const { fetchId: currentFetchId, timer } = this.state;
		if (fetchId !== currentFetchId) {
			this.setState({ fetchId });
			await this.getData();
		}
		if (!timer && timeout) {
			this.startTimer(timeout);
		} else if (timer && !timeout) {
			this.safeStopTimer();
		}
	}

	startTimer(timeout: number) {
		this.getData();
		const timer = setInterval(async () => await this.getData(), timeout);
		this.setState({
			timer
		});
	}

	safeStopTimer() {
		const { timer } = this.state;
		if (!timer) {
			return;
		}
		clearInterval(timer);
		this.setState({
			timer: null
		});
	}

	async getData() {
		const { fetch } = this.props;
		this.setState({ loading: true, error: undefined });
		try {
			const data = await fetch();
			this.setState({ data, loading: false });
		} catch (error) {
			this.setState({ error, loading: false, data: undefined });
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
