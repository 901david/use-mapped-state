"use strict";
exports.__esModule = true;
exports.ProtectedMap = void 0;
var React = require("react");
var ProtectedMap = /** @class */ (function () {
    function ProtectedMap(data) {
        this.data = data;
        this.map = this.convertToMap(this.data);
        this.modifyMappedState = this.modifyMappedState.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    ProtectedMap.prototype.getReturnValues = function () {
        var values = {};
        for (var _i = 0, _a = this.map.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], map = _b[1];
            values[key] = map.get(key);
        }
        return [values, this.modifyMappedState];
    };
    ProtectedMap.prototype.convertToMap = function (data) {
        if (!Array.isArray(data))
            throw new Error("Intial State format must be [[key, initialState]]");
        var map = new Map();
        data.map(function (_a) {
            var key = _a[0], val = _a[1];
            var _b = React.useState(val), stateVal = _b[0], stateSetter = _b[1];
            map.set(key, new Map([
                [key, stateVal],
                ["stateSetter", stateSetter],
            ]));
        });
        return map;
    };
    ProtectedMap.prototype.modifyMappedState = function (keys, vals) {
        var _this = this;
        var isBatched = Array.isArray(keys) && Array.isArray(vals);
        if (!isBatched) {
            keys = [keys];
            vals = [vals];
        }
        keys.forEach(function (key, idx) {
            if (_this.map.has(key)) {
                var innerMap = _this.map.get(key);
                var setter = innerMap && innerMap.get("stateSetter");
                if (setter) {
                    setter(vals[idx]);
                }
                else
                    throw new Error("State Setter not found");
            }
            else
                throw new Error("Key was not found in the map");
        });
    };
    ProtectedMap.prototype.getValue = function (key) {
        if (this.map.has(key)) {
            var stateMap = this.map.get(key);
            if (stateMap !== undefined)
                return stateMap.get(key);
        }
        else
            throw new Error("Key not found, check your key name");
    };
    return ProtectedMap;
}());
exports.ProtectedMap = ProtectedMap;
