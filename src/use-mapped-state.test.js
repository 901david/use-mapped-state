const { useMappedState } = require("./index");
const { renderHook, act } = require("@testing-library/react-hooks");

describe("UseMappedState", () => {
  describe("Standard Keys", () => {
    test("should Keep track of state", () => {
      const { result } = renderHook(() => useMappedState({ isFalse: true }));

      act(() => {
        result.current.valueSetter("isFalse", false);
      });
      const { isFalse } = result.current;
      expect(isFalse).toBe(false);
    });
  });
});
