import React from "react";

import { useMappedState } from "react-use-mapped-state";

const Example = () => {
  const [{ title }, valueSetter] = useMappedState([
    ["title", "Our first ok title with object"],
  ]);

  const onChangeTitle = () => {
    valueSetter("title", "Our fantastic new title....with object");
  };

  return (
    <>
      <div>{title}</div>
      <button onClick={onChangeTitle}>Change Title</button>
    </>
  );
};

export default Example;
