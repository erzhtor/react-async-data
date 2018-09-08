import React, { Component } from "react";

import ReactAsyncData from "react-async-data";

export default class App extends Component {
	state = {
		counter: 0
	};
	render() {
		return (
			<div className="container">
				<ReactAsyncData
					timeout={1000}
					fetch={() => {
						const newCounter = this.state.counter + 1;
						this.setState({ counter: newCounter });
						return Promise.resolve(newCounter);
					}}
				>
					{args => <pre>{JSON.stringify(args)}</pre>}
				</ReactAsyncData>
			</div>
		);
	}
}
