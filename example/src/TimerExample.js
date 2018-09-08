import React, { Component } from "react";
import ReactAsyncData from "react-async-data";

export class TimerExample extends Component {
	state = {
		counter: 0,
		timeout: 1000
	};

	render() {
		return (
			<div className="example">
				Timer example:
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
					Start timer
				</button>
				<button onClick={() => this.setState({ timeout: null })}>
					pause timer
				</button>
			</div>
		);
	}
}
