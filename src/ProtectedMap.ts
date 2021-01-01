import * as React from 'react';

export type MappedStateEntry = Array<[string, any]>;
export type valueSetter = (
  reference: string | string[],
  value: any | any[]
) => void;

export type MappedStateValues = { [key: string]: any };

export type MappedReturnValues = [MappedStateValues, valueSetter];
export type MappedStateInnerMap = Map<string, any>;
export type MappedStateMap = Map<string, MappedStateInnerMap>;
export type MappedStateMapEntry = [string, MappedStateInnerMap];

export type useMappedState = (
  stateValues: MappedStateEntry
) => MappedReturnValues;

class ProtectedMap {
  private map: MappedStateMap;

  constructor(private data: MappedStateEntry) {
    this.map = this.convertToMap(this.data);
    this.modifyMappedState = this.modifyMappedState.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getReturnValues(): MappedReturnValues {
    const values: MappedStateValues = {};
    Array.from(this.map.entries()).forEach((data: MappedStateMapEntry) => {
      const [key, map] = data;
      values[key] = map.get(key);
    });
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

  modifyMappedState(keys: string | string[], vals: any | any[]) {
    const isBatched = Array.isArray(keys) && Array.isArray(vals);
    if (!isBatched) {
      keys = [keys as string];
      vals = [vals];
    }

    (keys as string[]).forEach((key: string, idx: number) => {
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
