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
import get from 'lodash/get';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useInput, FieldTitle, useTranslate, useChoices, } from 'ra-core';
import ResettableTextField from './ResettableTextField';
import InputHelperText from './InputHelperText';
var sanitizeRestProps = function (_a) {
    var addLabel = _a.addLabel, allowEmpty = _a.allowEmpty, alwaysOn = _a.alwaysOn, emptyValue = _a.emptyValue, basePath = _a.basePath, choices = _a.choices, className = _a.className, component = _a.component, crudGetMatching = _a.crudGetMatching, crudGetOne = _a.crudGetOne, defaultValue = _a.defaultValue, filter = _a.filter, filterToQuery = _a.filterToQuery, formClassName = _a.formClassName, initializeForm = _a.initializeForm, input = _a.input, isRequired = _a.isRequired, label = _a.label, locale = _a.locale, meta = _a.meta, onChange = _a.onChange, options = _a.options, optionValue = _a.optionValue, optionText = _a.optionText, disableValue = _a.disableValue, perPage = _a.perPage, record = _a.record, reference = _a.reference, resource = _a.resource, setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, sort = _a.sort, source = _a.source, textAlign = _a.textAlign, translate = _a.translate, translateChoice = _a.translateChoice, validation = _a.validation, rest = __rest(_a, ["addLabel", "allowEmpty", "alwaysOn", "emptyValue", "basePath", "choices", "className", "component", "crudGetMatching", "crudGetOne", "defaultValue", "filter", "filterToQuery", "formClassName", "initializeForm", "input", "isRequired", "label", "locale", "meta", "onChange", "options", "optionValue", "optionText", "disableValue", "perPage", "record", "reference", "resource", "setFilter", "setPagination", "setSort", "sort", "source", "textAlign", "translate", "translateChoice", "validation"]);
    return rest;
};
var useStyles = makeStyles(function (theme) { return ({
    input: {
        minWidth: theme.spacing(20),
    },
}); }, { name: 'RaSelectInput' });
/**
 * An Input component for a select box, using an array of objects for the options
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
 * <SelectInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/>
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
 * <SelectInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Select> component
 *
 * You can disable some choices by providing a `disableValue` field which name is `disabled` by default
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 *    { id: 976, first_name: 'William', last_name: 'Rinkerd', disabled: true },
 * ];
 *
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 *    { id: 976, first_name: 'William', last_name: 'Rinkerd', not_available: true },
 * ];
 * <SelectInput source="gender" choices={choices} disableValue="not_available" />
 *
 */
var SelectInput = function (_a) {
    var allowEmpty = _a.allowEmpty, _b = _a.choices, choices = _b === void 0 ? [] : _b, className = _a.className, disableValue = _a.disableValue, emptyText = _a.emptyText, emptyValue = _a.emptyValue, format = _a.format, helperText = _a.helperText, label = _a.label, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, options = _a.options, optionText = _a.optionText, optionValue = _a.optionValue, parse = _a.parse, resource = _a.resource, source = _a.source, translateChoice = _a.translateChoice, validate = _a.validate, rest = __rest(_a, ["allowEmpty", "choices", "className", "disableValue", "emptyText", "emptyValue", "format", "helperText", "label", "onBlur", "onChange", "onFocus", "options", "optionText", "optionValue", "parse", "resource", "source", "translateChoice", "validate"]);
    var translate = useTranslate();
    var classes = useStyles({});
    var _c = useChoices({
        optionText: optionText,
        optionValue: optionValue,
        translateChoice: translateChoice,
    }), getChoiceText = _c.getChoiceText, getChoiceValue = _c.getChoiceValue;
    var _d = useInput(__assign({ format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate }, rest)), id = _d.id, input = _d.input, isRequired = _d.isRequired, _e = _d.meta, error = _e.error, touched = _e.touched;
    var renderEmptyItemOption = useCallback(function () {
        return React.isValidElement(emptyText)
            ? React.cloneElement(emptyText)
            : translate(emptyText, { _: emptyText });
    }, [emptyText, translate]);
    var renderMenuItemOption = useCallback(function (choice) { return getChoiceText(choice); }, [
        getChoiceText,
    ]);
    return (React.createElement(ResettableTextField, __assign({ id: id }, input, { select: true, label: label !== '' &&
            label !== false && (React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })), className: classes.input + " " + className, clearAlwaysVisible: true, error: !!(touched && error), helperText: React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }) }, options, sanitizeRestProps(rest)),
        allowEmpty ? (React.createElement(MenuItem, { value: emptyValue, key: "null", "aria-label": translate('ra.action.clear_input_value'), title: translate('ra.action.clear_input_value') }, renderEmptyItemOption())) : null,
        choices.map(function (choice) { return (React.createElement(MenuItem, { key: getChoiceValue(choice), value: getChoiceValue(choice), disabled: get(choice, disableValue) }, renderMenuItemOption(choice))); })));
};
SelectInput.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    emptyText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    emptyValue: PropTypes.any,
    choices: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]).isRequired,
    optionValue: PropTypes.string.isRequired,
    disableValue: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    translateChoice: PropTypes.bool,
};
SelectInput.defaultProps = {
    allowEmpty: false,
    emptyText: '',
    emptyValue: '',
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
    disableValue: 'disabled',
};
export default SelectInput;
