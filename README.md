# react-use-mapped-state

>

[![NPM](https://img.shields.io/npm/v/react-hooks-usemappedstate.svg)](https://www.npmjs.com/package/react-hooks-usemappedstate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i react-use-mapped-state
```

## Why?

This package was created to help manage state in functional components, overall attempting to provide a more consistent API to use for local state across React applications, while simplifying creating many pieces of state without bloating your code. There is no magic, it does what you already would do just in an automated manner.

## Usage -- Primitive Values

To use, pass in an array of arrays to `useMappedState` function call. Each internal array should be in the following format: `[key, value, configObject]`. Key and value are required and config object is optional, and right now has minimal support. This feature is expected to be expanded soon. Returned, is an array in this format: `[stateObj, stateSetter]`. The stateObj has keys which are the key passed in for each array, and the value returned is the "state" version of the value. The `stateSetter` is simple a function that can update keys with their appropriate state setter. It can be invoked like this `stateSetter(key, newValue)`, or to update multiple properties you can invoke like this: `stateSetter([key1, key2], [val1, val2])`.

```jsx
import React from "react";

import { useMappedState } from "react-use-mapped-state";

const ExampleOne = () => {
  const [{ title }, valueSetter] = useMappedState([
    ["title", "Our first ok title with array"],
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

export default ExampleOne;
```

## Usage -- Abstract Values

For abstract values as keys, the main difference is a getter function is returned instead of an object. So we get back from our call to `useMappedState`, `[getter, setter]`. The setter works the same as before, we can update one property or we can update multiple items at once with arrays. For getting the values, we just invoke the getter and pass in the abstract value.

```jsx
import React from "react";

import { useMappedState } from "react-use-mapped-state";

const ExampleTwo = () => {
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

export default ExampleTwo;
```

## License

MIT © [901david](https://github.com/901david)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
