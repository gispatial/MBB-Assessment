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
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var InputHelperText_1 = __importDefault(require("./InputHelperText"));
var useStyles = styles_1.makeStyles(function (theme) { return ({
    input: { width: theme.spacing(16) },
}); }, { name: 'RaNullableBooleanInput' });
var getBooleanFromString = function (value) {
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    return null;
};
var getStringFromBoolean = function (value) {
    if (value === true)
        return 'true';
    if (value === false)
        return 'false';
    return '';
};
var NullableBooleanInput = function (_a) {
    var className = _a.className, _b = _a.format, format = _b === void 0 ? getStringFromBoolean : _b, helperText = _a.helperText, label = _a.label, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, options = _a.options, displayNull = _a.displayNull, _d = _a.parse, parse = _d === void 0 ? getBooleanFromString : _d, resource = _a.resource, source = _a.source, validate = _a.validate, _e = _a.variant, variant = _e === void 0 ? 'filled' : _e, rest = __rest(_a, ["className", "format", "helperText", "label", "margin", "onBlur", "onChange", "onFocus", "options", "displayNull", "parse", "resource", "source", "validate", "variant"]);
    var classes = useStyles({});
    var translate = ra_core_1.useTranslate();
    var _f = ra_core_1.useInput({
        format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate,
    }), id = _f.id, input = _f.input, isRequired = _f.isRequired, _g = _f.meta, error = _g.error, touched = _g.touched;
    var enhancedOptions = displayNull
        ? __assign(__assign({}, options), { SelectProps: __assign({ displayEmpty: true }, (options && options.SelectProps)), InputLabelProps: __assign({ shrink: true }, (options && options.InputLabelProps)) }) : options;
    return (react_1.default.createElement(TextField_1.default, __assign({ id: id }, input, { select: true, margin: margin, label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), error: !!(touched && error), helperText: react_1.default.createElement(InputHelperText_1.default, { touched: touched, error: error, helperText: helperText }), className: classnames_1.default(classes.input, className), variant: variant }, enhancedOptions, sanitizeRestProps_1.default(rest)),
        react_1.default.createElement(MenuItem_1.default, { value: "" }, translate('ra.boolean.null')),
        react_1.default.createElement(MenuItem_1.default, { value: "false" }, translate('ra.boolean.false')),
        react_1.default.createElement(MenuItem_1.default, { value: "true" }, translate('ra.boolean.true'))));
};
NullableBooleanInput.propTypes = {
    label: prop_types_1.default.string,
    options: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
};
exports.default = NullableBooleanInput;
