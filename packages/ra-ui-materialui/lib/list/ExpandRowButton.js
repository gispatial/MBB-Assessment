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
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var ExpandRowButton = function (_a) {
    var _b;
    var classes = _a.classes, expanded = _a.expanded, expandContentId = _a.expandContentId, props = __rest(_a, ["classes", "expanded", "expandContentId"]);
    var translate = ra_core_1.useTranslate();
    return (react_1.default.createElement(IconButton_1.default, __assign({ "aria-label": translate(expanded ? 'ra.action.close' : 'ra.action.expand'), "aria-expanded": expanded, "aria-controls": expandContentId, className: classnames_1.default(classes.expandIcon, (_b = {},
            _b[classes.expanded] = expanded,
            _b)), component: "div", tabIndex: -1, "aria-hidden": "true" }, props),
        react_1.default.createElement(ExpandMore_1.default, null)));
};
exports.default = react_1.memo(ExpandRowButton);
