"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
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
        Array.from(this.map.entries()).forEach(function (data) {
            var _a = __read(data, 2), key = _a[0], map = _a[1];
            values[key] = map.get(key);
        });
        return [values, this.modifyMappedState];
    };
    ProtectedMap.prototype.convertToMap = function (data) {
        if (!Array.isArray(data))
            throw new Error('Intial State format must be [[key, initialState]]');
        var map = new Map();
        data.map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], val = _b[1];
            var _c = __read(React.useState(val), 2), stateVal = _c[0], stateSetter = _c[1];
            map.set(key, new Map([
                [key, stateVal],
                ['stateSetter', stateSetter],
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
                var setter = innerMap && innerMap.get('stateSetter');
                if (setter) {
                    setter(vals[idx]);
                }
                else
                    throw new Error("State Setter not found for key " + key);
            }
            else
                throw new Error("Key was not found in the map for key " + key);
        });
    };
    ProtectedMap.prototype.getValue = function (key) {
        if (this.map.has(key)) {
            var stateMap = this.map.get(key);
            if (stateMap !== undefined)
                return stateMap.get(key);
        }
        else
            throw new Error("Key not found, check your key name for " + key);
    };
    return ProtectedMap;
}());
exports["default"] = ProtectedMap;
