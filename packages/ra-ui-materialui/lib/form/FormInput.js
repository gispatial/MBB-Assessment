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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var Labeled_1 = __importDefault(require("../input/Labeled"));
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, record = _a.record, rest = __rest(_a, ["basePath", "record"]);
    return rest;
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    input: { width: theme.spacing(32) },
}); }, { name: 'RaFormInput' });
var FormInput = function (_a) {
    var _b, _c;
    var input = _a.input, classesOverride = _a.classes, rest = __rest(_a, ["input", "classes"]);
    var classes = useStyles({ classes: classesOverride });
    return input ? (react_1.default.createElement("div", { className: classnames_1.default('ra-input', "ra-input-" + input.props.source, input.props.formClassName) }, input.props.addLabel ? (react_1.default.createElement(Labeled_1.default, __assign({ id: input.props.id || input.props.source }, input.props, sanitizeRestProps(rest)), react_1.default.cloneElement(input, __assign({ className: classnames_1.default((_b = {},
            _b[classes.input] = !input.props.fullWidth,
            _b), input.props.className), id: input.props.id || input.props.source }, rest)))) : (react_1.default.cloneElement(input, __assign({ className: classnames_1.default((_c = {},
            _c[classes.input] = !input.props.fullWidth,
            _c), input.props.className), id: input.props.id || input.props.source }, rest))))) : null;
};
FormInput.propTypes = {
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    input: prop_types_1.default.object,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
FormInput.displayName = 'FormInput';
exports.default = FormInput;
