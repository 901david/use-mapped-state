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
