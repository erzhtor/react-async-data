import React, { Component } from "react";

import ReactAsyncData from "react-async-data";

class ExampleOne extends Component {
	state = {
		counter: 0,
		timeout: null
	};

	render() {
		return (
			<div className="example">
				Example 1:
				<ReactAsyncData
					timeout={this.state.timeout}
					fetch={() => {
						const newCounter = this.state.counter + 1;
						this.setState({ counter: newCounter });
						return Promise.resolve(newCounter);
					}}
				>
					{args => <pre>{JSON.stringify(args)}</pre>}
				</ReactAsyncData>
				<button onClick={() => this.setState({ timeout: 1000 })}>
					start timer
				</button>
				<button onClick={() => this.setState({ timeout: null })}>
					pause timer
				</button>
			</div>
		);
	}
}

class ExampleTwo extends Component {
	state = {
		counter: 0,
		fetchId: 0
	};

	render() {
		const { fetchId } = this.state;
		return (
			<div className="example">
				Example 2:
				<ReactAsyncData
					fetchId={fetchId}
					fetch={() => {
						const newCounter = this.state.counter + 1;
						this.setState({ counter: newCounter });
						return new Promise((resolve, reject) => {
							setTimeout(() => {
								if (this.state.throwError) {
									reject("Error happened");
								} else {
									resolve(newCounter);
								}
							}, 2000);
						});
					}}
				>
					{args => <pre>{JSON.stringify(args)}</pre>}
				</ReactAsyncData>
				<button
					onClick={() =>
						this.setState({
							fetchId: this.state.fetchId + 1,
							throwError: false
						})
					}
				>
					Refetch
				</button>
				<button
					onClick={() =>
						this.setState({
							fetchId: this.state.fetchId + 1,
							throwError: true
						})
					}
				>
					Refetch with error
				</button>
			</div>
		);
	}
}

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<ExampleOne />
				<ExampleTwo />
			</div>
		);
	}
}
