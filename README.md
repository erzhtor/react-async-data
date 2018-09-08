# react-async-data

> React Async Data Component

[![NPM](https://img.shields.io/npm/v/react-async-data.svg)](https://www.npmjs.com/package/react-async-data) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-async-data
```

or

```bash
yarn add react-async-data
```

## Usage

```tsx
import * as React from "react";
import ReactAsyncData from "react-async-data";

class Example extends React.Component {
  render() {
    return (
      <ReactAsyncData
        timeout={1000}
        fetch={() => {
          // fetch your data here
          return Promise.resolve({ title: "some cool title" });
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
      </ReactAsyncData>
    );
  }
}
```

## License

MIT © [erzhtor](https://github.com/erzhtor)
