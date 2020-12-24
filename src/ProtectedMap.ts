import * as React from "react";

export type MappedStateEntryConfigurtation = {};

export type MappedStateEntry = Array<
  [string, unknown, MappedStateEntryConfigurtation?]
>;
export type valueSetter = (
  reference: string | string[],
  value: any | any[]
) => void;

export type MappedReturnValues = [any, valueSetter];

export type ComplexMappedReturnedValues = [
  (key: any) => Map<any, any>,
  (keys: any, vals: any) => void
];

export type useMappedState = (
  stateValues: MappedStateEntry
) => MappedReturnValues;

export class ProtectedMap {
  private map: Map<string, Map<string, unknown>>;

  constructor(private data: MappedStateEntry) {
    this.map = this.convertToMap(this.data);
    this.modifyMappedState = this.modifyMappedState.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getReturnValues(): MappedReturnValues | ComplexMappedReturnedValues {
    const values = Array.from(this.map.entries()).reduce(
      (values, [key, map]) => {
        return { ...values, [key]: map.get(key) };
      },
      {}
    );
    return [values, this.modifyMappedState];
  }

  convertToMap(data: MappedStateEntry) {
    if (Array.isArray(data) === false)
      throw new Error("Must pass in an array of key-value pairs");
    const hasPairedArrays = data.every((pair) => {
      if (pair.length === 2) return true;
      const hasConfig = pair.length === 3 && typeof pair[2] === "object";

      if (hasConfig) return true;
      return false;
    });
    if (!hasPairedArrays)
      throw new Error(
        "Check your input, your array should contain arrays of key value pairs and as a third optional item, an itemConfig object"
      );
    const map = new Map();
    data.map(([key, val]) => {
      const [stateVal, stateSetter] = React.useState(val);
      map.set(
        key,
        new Map([
          [key, stateVal],
          ["stateSetter", stateSetter],
        ])
      );
    });
    return map;
  }

  modifyMappedState(keys: any | [any], vals: any | [any]) {
    const isBatched = Array.isArray(keys) && Array.isArray(vals);
    if (!isBatched) {
      keys = [keys];
      vals = [vals];
    }

    keys.forEach((key: string, idx: number) => {
      if (this.map.has(key)) {
        const innerMap = this.map.get(key);
        const setter = innerMap && innerMap.get("stateSetter");
        if (setter) {
          const setState = setter as (val: unknown) => void;
          setState(vals[idx]);
        } else throw new Error("State Setter not found");
      } else throw new Error("Key was sot found in the map");
    });
  }

  setValue(keys: string | string[], vals: unknown | Array<unknown>) {
    const keysIsArray = Array.isArray(keys);
    const valsIsArray = Array.isArray(vals);
    if ((keysIsArray && !valsIsArray) || (!keysIsArray && valsIsArray))
      throw new Error(
        "You must choose between batching or setting single value.  Check call to state setter."
      );
    const isBatched = keysIsArray && valsIsArray;
    const keysToProcess = !isBatched ? [keys] : (keys as string[]);
    const valsToProcess = !isBatched ? [vals] : (vals as unknown[]);

    keysToProcess.forEach((key: string, idx: number) => {
      if (this.map.has(key)) {
        const innerMap = this.map.get(key);
        const setter = innerMap && innerMap.get("stateSetter");
        if (setter) {
          const setState = setter as (val: unknown) => void;
          setState(valsToProcess[idx]);
        } else throw new Error("State Setter not found");
      } else throw new Error("Key not found, check your key name");
    });
  }
}
