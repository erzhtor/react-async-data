import React, { Component } from "react";
import ReactAsyncData from "react-async-data";

export class RefetchExample extends Component {
	state = {
		counter: 0,
		fetchId: 0
	};

	render() {
		const { fetchId } = this.state;
		return (
			<div className="example">
				Refetch Example:
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
