const { ProtectedMap } = require("./ProtectedMap");

export const useMappedState = (
  data,
  config = { complexKeysEnabled: false }
) => {
  const protectedMap = new ProtectedMap(data, config);
  return protectedMap.getReturnValues();
};
