import * as React from "react";

const convertToMap = data => {
  const dataToProcess = Array.isArray(data) ? data : Object.entries(data);
  const map = new Map();
  dataToProcess.map(([key, val]) => {
    const [stateVal, stateSetter] = React.useState(val);
    map.set(key, { [key]: stateVal, stateSetter });
  });
  return map;
};

export const useMappedState = (data, config = {}) => {
  const newMap = convertToMap(data);
  const modifyMappedState = (prop, val) => {
    const data = newMap.get(prop);
    const setter = data.stateSetter;
    setter(val);
  };
  const { complexKeysEnabled } = config;
  const returnValues = complexKeysEnabled
    ? newMap
    : [...newMap.entries()].reduce(
        (values, [key, val]) => ({ ...values, [key]: val[key] }),
        {}
      );

  return [returnValues, modifyMappedState];
};
