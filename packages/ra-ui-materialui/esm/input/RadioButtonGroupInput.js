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
import { makeStyles, FormControl, FormHelperText, FormLabel, RadioGroup, } from '@material-ui/core';
import get from 'lodash/get';
import { useInput, FieldTitle } from 'ra-core';
import sanitizeRestProps from './sanitizeRestProps';
import InputHelperText from './InputHelperText';
import RadioButtonGroupInputItem from './RadioButtonGroupInputItem';
var useStyles = makeStyles(function (theme) { return ({
    label: {
        transform: 'translate(0, 5px) scale(0.75)',
        transformOrigin: "top " + (theme.direction === 'ltr' ? 'left' : 'right'),
    },
}); }, { name: 'RaRadioButtonGroupInput' });
/**
 * An Input component for a radio button group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <RadioButtonGroupInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <RadioButtonGroupInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <RadioButtonGroupInput source="gender" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'M', name: 'myroot.gender.male' },
 *    { id: 'F', name: 'myroot.gender.female' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <RadioButtonGroupInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <RadioButtonGroup> component
 */
var RadioButtonGroupInput = function (_a) {
    var _b = _a.choices, choices = _b === void 0 ? [] : _b, classesOverride = _a.classes, format = _a.format, helperText = _a.helperText, label = _a.label, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, options = _a.options, optionText = _a.optionText, optionValue = _a.optionValue, parse = _a.parse, resource = _a.resource, row = _a.row, source = _a.source, translateChoice = _a.translateChoice, validate = _a.validate, rest = __rest(_a, ["choices", "classes", "format", "helperText", "label", "margin", "onBlur", "onChange", "onFocus", "options", "optionText", "optionValue", "parse", "resource", "row", "source", "translateChoice", "validate"]);
    var classes = useStyles(classesOverride);
    var _d = useInput(__assign({ format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate }, rest)), id = _d.id, isRequired = _d.isRequired, _e = _d.meta, error = _e.error, touched = _e.touched, input = _d.input;
    return (React.createElement(FormControl, __assign({ component: "fieldset", margin: margin, error: touched && !!error }, sanitizeRestProps(rest)),
        React.createElement(FormLabel, { component: "legend", className: classes.label },
            React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        React.createElement(RadioGroup, __assign({ id: id, row: row }, options), choices.map(function (choice) { return (React.createElement(RadioButtonGroupInputItem, __assign({}, input, { key: get(choice, optionValue), choice: choice, optionText: optionText, optionValue: optionValue, source: source, translateChoice: translateChoice }))); })),
        React.createElement(FormHelperText, null,
            React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }))));
};
RadioButtonGroupInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.any).isRequired,
    label: PropTypes.string,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]),
    optionValue: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    translateChoice: PropTypes.bool,
};
RadioButtonGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    row: true,
    translateChoice: true,
};
export default RadioButtonGroupInput;
