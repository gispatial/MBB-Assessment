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
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useInput, FieldTitle } from 'ra-core';
import InputHelperText from './InputHelperText';
import sanitizeRestProps from './sanitizeRestProps';
var convertStringToNumber = function (value) {
    var float = parseFloat(value);
    return isNaN(float) ? null : float;
};
/**
 * An Input component for a number
 *
 * @example
 * <NumberInput source="nb_views" />
 *
 * You can customize the `step` props (which defaults to "any")
 * @example
 * <NumberInput source="nb_views" step={1} />
 *
 * The object passed as `options` props is passed to the material-ui <TextField> component
 */
var NumberInput = function (_a) {
    var format = _a.format, helperText = _a.helperText, label = _a.label, _b = _a.margin, margin = _b === void 0 ? 'dense' : _b, onBlur = _a.onBlur, onFocus = _a.onFocus, onChange = _a.onChange, options = _a.options, _c = _a.parse, parse = _c === void 0 ? convertStringToNumber : _c, resource = _a.resource, source = _a.source, step = _a.step, validate = _a.validate, _d = _a.variant, variant = _d === void 0 ? 'filled' : _d, overrideInputProps = _a.inputProps, rest = __rest(_a, ["format", "helperText", "label", "margin", "onBlur", "onFocus", "onChange", "options", "parse", "resource", "source", "step", "validate", "variant", "inputProps"]);
    var _e = useInput(__assign({ format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source, type: 'number', validate: validate }, rest)), id = _e.id, input = _e.input, isRequired = _e.isRequired, _f = _e.meta, error = _f.error, touched = _f.touched;
    var inputProps = __assign(__assign({}, overrideInputProps), { step: step });
    return (React.createElement(TextField, __assign({ id: id }, input, { variant: variant, error: !!(touched && error), helperText: React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }), label: React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }), margin: margin, inputProps: inputProps }, options, sanitizeRestProps(rest))));
};
NumberInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
NumberInput.defaultProps = {
    options: {},
    step: 'any',
    textAlign: 'right',
};
export default NumberInput;
