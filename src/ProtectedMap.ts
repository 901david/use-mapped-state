import * as React from 'react';

export type MappedStateEntry = Array<[string, unknown]>;
export type valueSetter = (
  reference: string | string[],
  value: unknown | unknown[]
) => void;

export type MappedReturnValues = [{ [key: string]: unknown }, valueSetter];

export type useMappedState = (
  stateValues: MappedStateEntry
) => MappedReturnValues;

class ProtectedMap {
  private map: Map<string, Map<string, unknown>>;

  constructor(private data: MappedStateEntry) {
    this.map = this.convertToMap(this.data);
    this.modifyMappedState = this.modifyMappedState.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getReturnValues(): MappedReturnValues {
    const values: { [key: string]: unknown } = {};
    Array.from(this.map.entries()).forEach(
      (data: [string, Map<string, unknown>]) => {
        const [key, map] = data;
        values[key] = map.get(key);
      }
    );
    return [values, this.modifyMappedState];
  }

  convertToMap(data: MappedStateEntry) {
    if (!Array.isArray(data))
      throw new Error('Intial State format must be [[key, initialState]]');
    const map = new Map();

    data.map(([key, val]) => {
      const [stateVal, stateSetter] = React.useState(val);
      map.set(
        key,
        new Map([
          [key, stateVal],
          ['stateSetter', stateSetter],
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
        const setter = innerMap && innerMap.get('stateSetter');
        if (setter) {
          (setter as (key: string) => void)(vals[idx]);
        } else throw new Error(`State Setter not found for key ${key}`);
      } else throw new Error(`Key was not found in the map for key ${key}`);
    });
  }

  getValue(key: any) {
    if (this.map.has(key)) {
      const stateMap = this.map.get(key);
      if (stateMap !== undefined) return stateMap.get(key);
    } else throw new Error(`Key not found, check your key name for ${key}`);
  }
}

export default ProtectedMap;
