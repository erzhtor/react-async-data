# react-data-pass

> React Data Fetch Component

[![NPM](https://img.shields.io/npm/v/react-data-pass.svg)](https://www.npmjs.com/package/react-data-pass) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-data-pass
```

or

```bash
yarn add react-data-pass
```

## Usage

```tsx
import * as React from "react";
import ReactDataPass from "react-data-pass";

class Example extends React.Component {
  render() {
    return (
      <ReactDataPass
        timeout={1000}
        update={this.state.refetch}
        data={() => {
          // fetch your data here
          return { title: "some cool title" };
        }}
      >
        {({ loading, error, data }) => (
          <React.Fragment>
            {loading && "loading"}
            {error && "error"}
            {data && (
              <div>
                {data.title}
                <button onClick={() => this.setState({ refetch: true })}>
                  fetch again
                </button>
              </div>
            )}
          </React.Fragment>
        )}
      </ReactDataPass>
    );
  }
}
```

## License

MIT © [erzhtor](https://github.com/erzhtor)
