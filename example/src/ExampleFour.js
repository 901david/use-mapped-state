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
