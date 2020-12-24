"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var ProtectedMap = /** @class */ (function () {
    function ProtectedMap(data) {
        this.data = data;
        this.map = this.convertToMap(this.data);
        this.modifyMappedState = this.modifyMappedState.bind(this);
    }
    ProtectedMap.prototype.getReturnValues = function () {
        var values = Array.from(this.map.entries()).reduce(function (values, _a) {
            var _b;
            var key = _a[0], map = _a[1];
            return __assign({}, values, (_b = {}, _b[key] = map.get(key), _b));
        }, {});
        return [values, this.modifyMappedState];
    };
    ProtectedMap.prototype.convertToMap = function (data) {
        if (Array.isArray(data) === false)
            throw new Error("Must pass in an array of key-value pairs");
        var hasPairedArrays = data.every(function (pair) {
            if (pair.length === 2)
                return true;
            var hasConfig = pair.length === 3 && typeof pair[2] === "object";
            if (hasConfig)
                return true;
            return false;
        });
        if (!hasPairedArrays)
            throw new Error("Check your input, your array should contain arrays of key value pairs and as a third optional item, an itemConfig object");
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
        var keysIsArray = Array.isArray(keys);
        var valsIsArray = Array.isArray(vals);
        if ((keysIsArray && !valsIsArray) || (!keysIsArray && valsIsArray))
            throw new Error("You must choose between batching or setting single value.  Check call to state setter.");
        var isBatched = keysIsArray && valsIsArray;
        var keysToProcess = !isBatched ? [keys] : keys;
        var valsToProcess = !isBatched ? [vals] : vals;
        keysToProcess.forEach(function (key, idx) {
            if (_this.map.has(key)) {
                var innerMap = _this.map.get(key);
                var setter = innerMap && innerMap.get("stateSetter");
                if (setter) {
                    var setState = setter;
                    setState(valsToProcess[idx]);
                }
                else
                    throw new Error("State Setter not found");
            }
            else
                throw new Error("Key was not found in the map");
        });
    };
    return ProtectedMap;
}());
exports.ProtectedMap = ProtectedMap;
