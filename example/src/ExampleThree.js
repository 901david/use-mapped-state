import React from "react";

import { useMappedState } from "react-use-mapped-state";

const ExampleThree = () => {
  const someAbstractValue = { prop1: "Hi", prop2: "something else" };
  const [map, valueSetter] = useMappedState(
    [[someAbstractValue, "Our first ok title with complex array"]],
    { abstractKeysEnabled: true }
  );
  const title = map.get(someAbstractValue);

  const onoChangeTitle = () => {
    valueSetter(
      someAbstractValue,
      "Our fantastic new title....with complex array"
    );
  };
  console.log(title);

  return (
    <>
      <div>{title}</div>
      <button onClick={onoChangeTitle}>Change Title</button>
    </>
  );
};

export default ExampleThree;
