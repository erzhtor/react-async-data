# react-async-data

> React Async Data Component

[![NPM](https://img.shields.io/npm/v/react-async-data.svg)](https://www.npmjs.com/package/react-async-data) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- Easy fetch and pass data
- dynamic refetch based on timeout interval
- custom refetch
- _TypeScript_ typings

## Install

```bash
npm install --save react-async-data
```

or

```bash
yarn add react-async-data
```

## Usage

import Component

```jsx
import React from "react";
import ReactAsyncData from "react-async-data";
```

```jsx
<ReactAsyncData
  timeout={1000}
  fetch={() => {
    // fetch your data here
    return Promise.resolve({ title: "some cool title" });
  }}
>
  {({ status, data }) => (
    <React.Fragment>
      {status === "loading" && "loading"}
      {status === "error" && "error"}
      {status === "completed" && data && <div>{data.title}</div>}
    </React.Fragment>
  )}
</ReactAsyncData>
```

**More examples**

- Example with dynamic timeout [./example/src/TimerExample.js](example/src/TimerExample.js)
- Example with custom refetch [./example/src/RefetchExample.js](example/src/RefetchExample.js)

## Props

- **`fetch`**: _`() => Promise<TData>`._ **Required**. Function that returns promise. Any data that promise resolves passed to children as _data_ object.
- **`timeout`**: _`number`._ Optional. If passed refetches every given _timeout_ (millis).
- **`fetchId`**: _`number | string | boolean`._ Optional. Refetches every time when changed.
- **`children`**: _`(args: { loading: boolean; error?: any; data?: TData;}) => React.ReactNode`._ Optional. Children would be called with the specified args params.

## License

MIT © [Erzhan Torokulov](https://github.com/erzhtor)
