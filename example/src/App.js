import React, { Component } from "react";
import { TimerExample } from "./TimerExample";
import { RefetchExample } from "./RefetchExample";

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<TimerExample />
				<RefetchExample />
			</div>
		);
	}
}
