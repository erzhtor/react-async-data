/**
 * @class ReactDataComponent
 */

import * as React from "react";

import styles from "./styles.css";

export type Props = { text: string };

export default class ReactDataComponent extends React.Component<Props> {
	render() {
		const { text } = this.props;

		return <div className={styles.test}>Example Component: {text}</div>;
	}
}
