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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ra_core_1 = require("ra-core");
var core_1 = require("@material-ui/core");
var Visibility_1 = __importDefault(require("@material-ui/icons/Visibility"));
var VisibilityOff_1 = __importDefault(require("@material-ui/icons/VisibilityOff"));
var TextInput_1 = __importDefault(require("./TextInput"));
var PasswordInput = function (_a) {
    var _b = _a.initiallyVisible, initiallyVisible = _b === void 0 ? false : _b, props = __rest(_a, ["initiallyVisible"]);
    var _c = react_1.useState(initiallyVisible), visible = _c[0], setVisible = _c[1];
    var translate = ra_core_1.useTranslate();
    var handleClick = function () {
        setVisible(!visible);
    };
    return (react_1.default.createElement(TextInput_1.default, __assign({}, props, { type: visible ? 'text' : 'password', InputProps: {
            endAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "end" },
                react_1.default.createElement(core_1.IconButton, { "aria-label": translate(visible
                        ? 'ra.input.password.toggle_visible'
                        : 'ra.input.password.toggle_hidden'), onClick: handleClick }, visible ? react_1.default.createElement(Visibility_1.default, null) : react_1.default.createElement(VisibilityOff_1.default, null)))),
        } })));
};
exports.default = PasswordInput;
