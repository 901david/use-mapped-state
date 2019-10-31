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