# react-use-mapped-state

>

[![NPM](https://img.shields.io/npm/v/react-hooks-usemappedstate.svg)](https://www.npmjs.com/package/react-hooks-usemappedstate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i react-use-mapped-state
```

## Usage -- Basic

```jsx
import React from 'react';

import { useMappedState } from 'react-use-mapped-state';

const Example = () => {
  const [{ title }, setState] = useMappedState([
    ['title', 'Our first ok title with object'],
  ]);
  const onChangeTitle = () => {
    setState('title', 'Our fantastic new title....with object');
  };
  return (
    <>
      <div>{title}</div>
      <button onClick={onChangeTitle}>Change Title</button>
    </>
  );
};

export default Example;
```

## Usage -- Basic with previousValues using function

```jsx
import React from 'react';

import { useMappedState } from 'react-use-mapped-state';

const Example = () => {
  const [{ counter }, setState] = useMappedState([['counter', 1]]);
  const onIncremenet = () => {
    setState('counter', prevVal => prevVal + 1);
  };
  return (
    <>
      <div>{counter}</div>
      <button onClick={onIncremenet}>Click to Increment</button>
    </>
  );
};

export default Example;
```

## Usage -- Basic - with Batching

```jsx
import React from 'react';

import { useMappedState } from 'react-use-mapped-state';

const Example = () => {
  const [{ title }, setState] = useMappedState([
    ['title', 'Our first ok title with object'],
    ['hasTitleChanged', false],
  ]);
  const onChangeTitle = () => {
    setState(
      ['title', hasTitleChanged],
      ['Our fantastic new title....with object', true]
    );
  };
  return (
    <>
      <div>{title}</div>
      <div>Has title Ever been changed? {hasTitleChanged}</div>
      <button onClick={onChangeTitle}>Change Title</button>
    </>
  );
};

export default Example;
```

## Usage -- Basic with previousValues using function with batching

```jsx
import React from 'react';

import { useMappedState } from 'react-use-mapped-state';

const Example = () => {
  const [{ counter }, setState] = useMappedState([
    ['counter', 1],
    ['hasCounterBeenClicked', false],
  ]);
  const onIncremenet = () => {
    setState(
      ['counter', 'hasCounterBeenClicked'],
      [prevVal => prevVal + 1, true]
    );
  };
  return (
    <>
      <div>{counter}</div>
      <div>Has Counter Been Clicked? {hasCounterBeenClicked}</div>
      <button onClick={onIncremenet}>Click to Increment</button>
    </>
  );
};

export default Example;
```

## License

MIT © [901david](https://github.com/901david)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
