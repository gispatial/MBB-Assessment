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
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Select, MenuItem, InputLabel, Input, FilledInput, FormHelperText, FormControl, Chip, } from '@material-ui/core';
import classnames from 'classnames';
import { FieldTitle, useInput, useChoices, } from 'ra-core';
import InputHelperText from './InputHelperText';
var sanitizeRestProps = function (_a) {
    var addLabel = _a.addLabel, allowEmpty = _a.allowEmpty, basePath = _a.basePath, choices = _a.choices, classNamInputWithOptionsPropse = _a.classNamInputWithOptionsPropse, componenInputWithOptionsPropst = _a.componenInputWithOptionsPropst, crudGetMInputWithOptionsPropsatching = _a.crudGetMInputWithOptionsPropsatching, crudGetOInputWithOptionsPropsne = _a.crudGetOInputWithOptionsPropsne, defaultValue = _a.defaultValue, filter = _a.filter, filterToQuery = _a.filterToQuery, formClassName = _a.formClassName, initializeForm = _a.initializeForm, input = _a.input, isRequired = _a.isRequired, label = _a.label, limitChoicesToValue = _a.limitChoicesToValue, loaded = _a.loaded, locale = _a.locale, meta = _a.meta, onChange = _a.onChange, options = _a.options, optionValue = _a.optionValue, optionText = _a.optionText, perPage = _a.perPage, record = _a.record, reference = _a.reference, resource = _a.resource, setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, sort = _a.sort, source = _a.source, textAlign = _a.textAlign, translate = _a.translate, translateChoice = _a.translateChoice, validation = _a.validation, rest = __rest(_a, ["addLabel", "allowEmpty", "basePath", "choices", "classNamInputWithOptionsPropse", "componenInputWithOptionsPropst", "crudGetMInputWithOptionsPropsatching", "crudGetOInputWithOptionsPropsne", "defaultValue", "filter", "filterToQuery", "formClassName", "initializeForm", "input", "isRequired", "label", "limitChoicesToValue", "loaded", "locale", "meta", "onChange", "options", "optionValue", "optionText", "perPage", "record", "reference", "resource", "setFilter", "setPagination", "setSort", "sort", "source", "textAlign", "translate", "translateChoice", "validation"]);
    return rest;
};
var useStyles = makeStyles(function (theme) { return ({
    root: {},
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1 / 4),
    },
    select: {
        height: 'auto',
        overflow: 'auto',
    },
}); }, { name: 'RaSelectArrayInput' });
/**
 * An Input component for a select box allowing multiple selections, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'programming', name: 'Programming' },
 *    { id: 'lifestyle', name: 'Lifestyle' },
 *    { id: 'photography', name: 'Photography' },
 * ];
 * <SelectArrayInput source="tags" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectArrayInput source="authors" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectArrayInput source="authors" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectArrayInput source="authors" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.tags.programming' },
 *    { id: 'lifestyle', name: 'myroot.tags.lifestyle' },
 *    { id: 'photography', name: 'myroot.tags.photography' },
 * ];
 */
var SelectArrayInput = function (_a) {
    var _b = _a.choices, choices = _b === void 0 ? [] : _b, classesOverride = _a.classes, className = _a.className, format = _a.format, helperText = _a.helperText, label = _a.label, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, options = _a.options, optionText = _a.optionText, optionValue = _a.optionValue, parse = _a.parse, resource = _a.resource, source = _a.source, translateChoice = _a.translateChoice, validate = _a.validate, _d = _a.variant, variant = _d === void 0 ? 'filled' : _d, rest = __rest(_a, ["choices", "classes", "className", "format", "helperText", "label", "margin", "onBlur", "onChange", "onFocus", "options", "optionText", "optionValue", "parse", "resource", "source", "translateChoice", "validate", "variant"]);
    var classes = useStyles({ classes: classesOverride });
    var _e = useChoices({
        optionText: optionText,
        optionValue: optionValue,
        translateChoice: translateChoice,
    }), getChoiceText = _e.getChoiceText, getChoiceValue = _e.getChoiceValue;
    var _f = useInput(__assign({ format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate }, rest)), id = _f.id, input = _f.input, isRequired = _f.isRequired, _g = _f.meta, error = _g.error, touched = _g.touched;
    var renderMenuItemOption = useCallback(function (choice) { return getChoiceText(choice); }, [
        getChoiceText,
    ]);
    var renderMenuItem = useCallback(function (choice) {
        return choice ? (React.createElement(MenuItem, { key: getChoiceValue(choice), value: getChoiceValue(choice) }, renderMenuItemOption(choice))) : null;
    }, [getChoiceValue, renderMenuItemOption]);
    return (React.createElement(FormControl, __assign({ margin: margin, className: classnames(classes.root, className), error: touched && !!error, variant: variant }, sanitizeRestProps(rest)),
        React.createElement(InputLabel, { htmlFor: id, shrink: true, variant: variant, error: touched && !!error },
            React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        React.createElement(Select, __assign({ autoWidth: true, multiple: true, input: variant === 'standard' ? (React.createElement(Input, { id: id })) : (React.createElement(FilledInput, { id: id })), error: !!(touched && error), renderValue: function (selected) { return (React.createElement("div", { className: classes.chips }, selected
                .map(function (item) {
                return choices.find(function (choice) { return getChoiceValue(choice) === item; });
            })
                .map(function (item) { return (React.createElement(Chip, { key: getChoiceValue(item), label: renderMenuItemOption(item), className: classes.chip })); }))); }, "data-testid": "selectArray", variant: variant }, input, { value: input.value || [] }, options), choices.map(renderMenuItem)),
        React.createElement(FormHelperText, { error: touched && !!error },
            React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }))));
};
SelectArrayInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.string,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    source: PropTypes.string,
    translateChoice: PropTypes.bool,
};
SelectArrayInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
};
export default SelectArrayInput;
