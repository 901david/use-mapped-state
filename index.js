const useState = require("react").useState;
​
const convertToMap = data => {
  const dataToProcess = Array.isArray(data) ? data : Object.entries(data);
  const map = new Map();
  dataToProcess.map(([key, val]) => {
    const [stateVal, stateSetter] = useState(val);
    map.set(key, { [key]: stateVal, stateSetter });
  });
  return map;
};

const useMappedState = data => {
  const newMap = convertToMap(data);
  const modifyMappedState = (prop, val) => {
    const data = newMap.get(prop);
    const setter = data.stateSetter;
    setter(val);
  };
  
  const returnValues = [...newMap.entries()].reduce(
    (values, [key, val]) => ({ ...values, [key]: val[key] }),
    {}
  );
  
  return [returnValues, modifyMappedState];
};

module.exports = useMappedState;