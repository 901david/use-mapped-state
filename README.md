# react-use-mapped-state

>

[![NPM](https://img.shields.io/npm/v/react-hooks-usemappedstate.svg)](https://www.npmjs.com/package/react-hooks-usemappedstate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-mapped-state
```

## Usage -- Primitive Values

```jsx
import React from "react";

import { useMappedState } from "react-use-mapped-state";

const Example = () => {
  const [{ title }, valueSetter] = useMappedState({
    title: "Our first ok title with object"
  });
  const onoChangeTitle = () => {
    valueSetter("title", "Our fantastic new title....with object");
  };
  return (
    <>
      <div>{title}</div>
      <button onClick={onoChangeTitle}>Change Title</button>
    </>
  );
};

export default Example;
```

Can also be used with the array format for creating Maps

```jsx
import React from "react";

import { useMappedState } from "react-use-mapped-state";

const ExampleTwo = () => {
  const [{ title }, valueSetter] = useMappedState([
    ["title", "Our first ok title with array"]
  ]);
  const onoChangeTitle = () => {
    valueSetter("title", "Our fantastic new title....with array");
  };
  return (
    <>
      <div>{title}</div>
      <button onClick={onoChangeTitle}>Change Title</button>
    </>
  );
};

export default ExampleTwo;
```

## Usage -- Abstract Values

```jsx
import React from "react";

import { useMappedState } from "react-use-mapped-state";

const ExampleThree = () => {
  const someAbstractValue = { prop1: "Hi", prop2: "something else" };
  const [getter, setter] = useMappedState(
    [[someAbstractValue, "Our first ok title with complex array"]],
    { complexKeysEnabled: true }
  );

  const title = getter(someAbstractValue);

  const onoChangeTitle = () => {
    setter(someAbstractValue, "Our fantastic new title....with complex array");
  };

  return (
    <>
      <div>{title}</div>
      <button onClick={onoChangeTitle}>Change Title</button>
    </>
  );
};

export default ExampleThree;
```

Can also be used with the array format for creating Maps

```jsx
import React from "react";

import { useMappedState } from "react-use-mapped-state";

const ExampleFour = () => {
  const someAbstractValue = () => ({ prop1: "Hi", prop2: "something else" });
  const [getter, setter] = useMappedState(
    [[someAbstractValue, "Our first ok title with Function"]],
    { complexKeysEnabled: true }
  );

  const title = getter(someAbstractValue);

  const onoChangeTitle = () => {
    setter(someAbstractValue, "Our fantastic new title....with Function");
  };

  return (
    <>
      <div>{title}</div>
      <button onClick={onoChangeTitle}>Change Title</button>
    </>
  );
};

export default ExampleFour;
```

## License

MIT © [901david](https://github.com/901david)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
