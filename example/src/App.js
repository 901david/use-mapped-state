import React from "react";
import { useMappedState } from "react-use-mapped-state";

const App = () => {
  const [{ title }, setter] = useMappedState({ title: "hello world" });

  const onClick = () => {
    setter("title", "It changes!!!!");
  };

  return <div onClick={onClick}>{title}</div>;
};
export default App;
