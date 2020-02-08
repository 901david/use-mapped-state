import * as React from "react";

class ProtectedMap {
  constructor(data, config) {
    this.data = data;
    this.map = this.convertToMap(data);
    this.config = config;

    this.modifyMappedState = this.modifyMappedState.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getReturnValues() {
    const { complexKeysEnabled } = this.config;
    if (complexKeysEnabled) {
      return [this.getValue, this.setValue];
    }

    const values = [...this.map.entries()].reduce((values, [key, map]) => {
      return { ...values, [key]: map.get(key) };
    }, {});
    return [values, this.modifyMappedState];
  }

  convertToMap(data) {
    const dataToProcess = Array.isArray(data) ? data : Object.entries(data);
    const map = new Map();
    dataToProcess.map(([key, val]) => {
      const [stateVal, stateSetter] = React.useState(val);
      map.set(
        key,
        new Map([
          [key, stateVal],
          ["stateSetter", stateSetter]
        ])
      );
    });
    return map;
  }

  modifyMappedState(prop, val) {
    const data = this.map.get(prop);
    const setter = data.get("stateSetter");
    setter(val);
  }

  getValue(key) {
    if (this.map.has(key)) {
      return this.map.get(key).get(key);
    }
    return undefined;
  }

  setValue(keys, vals) {
    // const isErrored =
    //   (Array.isArray(keys) && !Array.isArray(vals)) ||
    //   (!Array.isArray(keys) && Array.isArray(vals));
    // if (isErrored)
    //   throw new Error(
    //     "To submit a batch request both keys and values must be arrays"
    //   );
    // const isBatched = Array.isArray(keys) && Array.isArray(vals);
    // if (!isBatched) {
    //   keys = [keys];
    //   vals = [vals];
    // }
    // keys.forEach((key, idx) => {
    //   if (this.map.has(key)) {
    //     const innerMap = this.map.get(key);
    //     const setter = innerMap.get("stateSetter");
    //     setter(vals[idx]);
    //   } else {
    //     throw new Error("Key was not found in the map");
    //   }
    // });
    if (this.map.has(key)) {
      const innerMap = this.map.get(key);
      const setter = innerMap.get("stateSetter");
      setter(val);
    }
  }
}

export default ProtectedMap;
