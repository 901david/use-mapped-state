# react-use-mapped-state

>

[![NPM](https://img.shields.io/npm/v/react-use-mapped-state.svg)](https://www.npmjs.com/package/react-use-mapped-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-mapped-state
```

## Usage

```jsx
import React, { Component } from "react";

import { useMappedState } from "react-use-mapped-state";

const Example = () => {
  const [{ title }, valueSetter] = useMappedState({
    title: "Our first ok title"
  });
  const onoChangeTitle = () => {
    valueSetter("title", "Our fantastic new title....");
  };
  return (
    <>
      <div>{example}</div>
      <button onClick={onoChangeTitle}>Change Title</button>
    </>
  );
};
```

## License

MIT © [901david](https://github.com/901david)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
