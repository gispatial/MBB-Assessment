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
import React, { useCallback, useEffect, useRef, useState, useMemo, isValidElement, } from 'react';
import Downshift from 'downshift';
import get from 'lodash/get';
import { makeStyles, TextField } from '@material-ui/core';
import { useInput, FieldTitle, useSuggestions, warning, } from 'ra-core';
import InputHelperText from './InputHelperText';
import AutocompleteSuggestionList from './AutocompleteSuggestionList';
import AutocompleteSuggestionItem from './AutocompleteSuggestionItem';
/**
 * An Input component for an autocomplete field, using an array of objects for the options
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
 * <AutocompleteInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <AutocompleteInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <AutocompleteInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * Note that you must also specify the `matchSuggestion` prop
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const matchSuggestion = (filterValue, choice) => choice.first_name.match(filterValue) || choice.last_name.match(filterValue);
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectInput source="gender" choices={choices} optionText={<FullNameField />} matchSuggestion={matchSuggestion} />
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
 * <AutocompleteInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <TextField> component
 *
 * @example
 * <AutocompleteInput source="author_id" options={{ color: 'secondary', InputLabelProps: { shrink: true } }} />
 */
var AutocompleteInput = function (_a) {
    var allowEmpty = _a.allowEmpty, className = _a.className, classesOverride = _a.classes, _b = _a.choices, choices = _b === void 0 ? [] : _b, emptyText = _a.emptyText, emptyValue = _a.emptyValue, format = _a.format, fullWidth = _a.fullWidth, helperText = _a.helperText, idOverride = _a.id, inputOverride = _a.input, isRequiredOverride = _a.isRequired, label = _a.label, limitChoicesToValue = _a.limitChoicesToValue, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, matchSuggestion = _a.matchSuggestion, metaOverride = _a.meta, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, _d = _a.options, _e = _d === void 0 ? {
        suggestionsContainerProps: undefined,
        labelProps: undefined,
        InputProps: undefined,
    } : _d, suggestionsContainerProps = _e.suggestionsContainerProps, labelProps = _e.labelProps, InputProps = _e.InputProps, options = __rest(_e, ["suggestionsContainerProps", "labelProps", "InputProps"]), _f = _a.optionText, optionText = _f === void 0 ? 'name' : _f, inputText = _a.inputText, _g = _a.optionValue, optionValue = _g === void 0 ? 'id' : _g, parse = _a.parse, resource = _a.resource, setFilter = _a.setFilter, shouldRenderSuggestionsOverride = _a.shouldRenderSuggestions, source = _a.source, suggestionLimit = _a.suggestionLimit, _h = _a.translateChoice, translateChoice = _h === void 0 ? true : _h, validate = _a.validate, _j = _a.variant, variant = _j === void 0 ? 'filled' : _j, rest = __rest(_a, ["allowEmpty", "className", "classes", "choices", "emptyText", "emptyValue", "format", "fullWidth", "helperText", "id", "input", "isRequired", "label", "limitChoicesToValue", "margin", "matchSuggestion", "meta", "onBlur", "onChange", "onFocus", "options", "optionText", "inputText", "optionValue", "parse", "resource", "setFilter", "shouldRenderSuggestions", "source", "suggestionLimit", "translateChoice", "validate", "variant"]);
    if (isValidElement(optionText) && !inputText) {
        throw new Error("If the optionText prop is a React element, you must also specify the inputText prop:\n        <AutocompleteInput\n            inputText={(record) => record.title}\n        />");
    }
    warning(isValidElement(optionText) && !matchSuggestion, "If the optionText prop is a React element, you must also specify the matchSuggestion prop:\n<AutocompleteInput\n    matchSuggestion={(filterValue, suggestion) => true}\n/>\n        ");
    var classes = useStyles({ classes: classesOverride });
    var inputEl = useRef();
    var anchorEl = useRef();
    var _k = useInput(__assign({ format: format, id: idOverride, input: inputOverride, meta: metaOverride, onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate }, rest)), id = _k.id, input = _k.input, isRequired = _k.isRequired, _l = _k.meta, touched = _l.touched, error = _l.error;
    var _m = useState(''), filterValue = _m[0], setFilterValue = _m[1];
    var getSuggestionFromValue = useCallback(function (value) { return choices.find(function (choice) { return get(choice, optionValue) === value; }); }, [choices, optionValue]);
    var selectedItem = useMemo(function () { return getSuggestionFromValue(input.value) || null; }, [input.value, getSuggestionFromValue]);
    var _o = useSuggestions({
        allowEmpty: allowEmpty,
        choices: choices,
        emptyText: emptyText,
        emptyValue: emptyValue,
        limitChoicesToValue: limitChoicesToValue,
        matchSuggestion: matchSuggestion,
        optionText: optionText,
        optionValue: optionValue,
        selectedItem: selectedItem,
        suggestionLimit: suggestionLimit,
        translateChoice: translateChoice,
    }), getChoiceText = _o.getChoiceText, getChoiceValue = _o.getChoiceValue, getSuggestions = _o.getSuggestions;
    var handleFilterChange = useCallback(function (eventOrValue) {
        var event = eventOrValue;
        var value = event.target
            ? event.target.value
            : eventOrValue;
        if (setFilter) {
            setFilter(value);
        }
    }, [setFilter]);
    // We must reset the filter every time the value changes to ensure we
    // display at least some choices even if the input has a value.
    // Otherwise, it would only display the currently selected one and the user
    // would have to first clear the input before seeing any other choices
    useEffect(function () {
        handleFilterChange('');
        // If we have a value, set the filter to its text so that
        // Downshift displays it correctly
        setFilterValue(input.value
            ? inputText
                ? inputText(getChoiceText(selectedItem).props.record)
                : getChoiceText(selectedItem)
            : '');
    }, [
        input.value,
        handleFilterChange,
        selectedItem,
        getChoiceText,
        inputText,
    ]);
    var handleChange = useCallback(function (item) {
        input.onChange(getChoiceValue(item));
    }, [getChoiceValue, input]);
    // This function ensures that the suggestion list stay aligned to the
    // input element even if it moves (because user scrolled for example)
    var updateAnchorEl = function () {
        if (!inputEl.current) {
            return;
        }
        var inputPosition = inputEl.current.getBoundingClientRect();
        // It works by implementing a mock element providing the only method used
        // by the PopOver component, getBoundingClientRect, which will return a
        // position based on the input position
        if (!anchorEl.current) {
            anchorEl.current = { getBoundingClientRect: function () { return inputPosition; } };
        }
        else {
            var anchorPosition = anchorEl.current.getBoundingClientRect();
            if (anchorPosition.x !== inputPosition.x ||
                anchorPosition.y !== inputPosition.y) {
                anchorEl.current = {
                    getBoundingClientRect: function () { return inputPosition; },
                };
            }
        }
    };
    var storeInputRef = function (input) {
        inputEl.current = input;
        updateAnchorEl();
    };
    var handleBlur = useCallback(function (event) {
        handleFilterChange('');
        // If we had a value before, set the filter back to its text so that
        // Downshift displays it correctly
        setFilterValue(input.value
            ? inputText
                ? inputText(getChoiceText(selectedItem).props.record)
                : getChoiceText(selectedItem)
            : '');
        input.onBlur(event);
    }, [getChoiceText, handleFilterChange, input, inputText, selectedItem]);
    var handleFocus = useCallback(function (openMenu) { return function (event) {
        openMenu(event);
        input.onFocus(event);
    }; }, [input]);
    var shouldRenderSuggestions = function (val) {
        if (shouldRenderSuggestionsOverride !== undefined &&
            typeof shouldRenderSuggestionsOverride === 'function') {
            return shouldRenderSuggestionsOverride(val);
        }
        return true;
    };
    return (React.createElement(Downshift, __assign({ inputValue: filterValue, onChange: handleChange, selectedItem: selectedItem, itemToString: function (item) { return getChoiceValue(item); } }, rest), function (_a) {
        var getInputProps = _a.getInputProps, getItemProps = _a.getItemProps, getLabelProps = _a.getLabelProps, getMenuProps = _a.getMenuProps, isOpen = _a.isOpen, highlightedIndex = _a.highlightedIndex, openMenu = _a.openMenu;
        var isMenuOpen = isOpen && shouldRenderSuggestions(filterValue);
        var _b = getInputProps(__assign({ onBlur: handleBlur, onFocus: handleFocus(openMenu) }, InputProps)), downshiftId = _b.id, // We want to ignore this to correctly link our label and the input
        value = _b.value, onBlur = _b.onBlur, onChange = _b.onChange, onFocus = _b.onFocus, ref = _b.ref, size = _b.size, color = _b.color, inputProps = __rest(_b, ["id", "value", "onBlur", "onChange", "onFocus", "ref", "size", "color"]);
        var suggestions = getSuggestions(filterValue);
        return (React.createElement("div", { className: classes.container },
            React.createElement(TextField, __assign({ id: id, name: input.name, InputProps: {
                    inputRef: storeInputRef,
                    onBlur: onBlur,
                    onChange: function (event) {
                        handleFilterChange(event);
                        setFilterValue(event.target.value);
                        onChange(event);
                    },
                    onFocus: onFocus,
                }, error: !!(touched && error), label: React.createElement(FieldTitle, __assign({ label: label }, labelProps, { source: source, resource: resource, isRequired: typeof isRequiredOverride !==
                        'undefined'
                        ? isRequiredOverride
                        : isRequired })), InputLabelProps: getLabelProps({
                    htmlFor: id,
                }), helperText: React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }), variant: variant, margin: margin, fullWidth: fullWidth, value: filterValue, className: className, size: size, color: color }, inputProps, options)),
            React.createElement(AutocompleteSuggestionList, { isOpen: isMenuOpen, menuProps: getMenuProps({}, 
                // https://github.com/downshift-js/downshift/issues/235
                { suppressRefError: true }), inputEl: inputEl.current, suggestionsContainerProps: suggestionsContainerProps }, suggestions.map(function (suggestion, index) { return (React.createElement(AutocompleteSuggestionItem, __assign({ key: getChoiceValue(suggestion), suggestion: suggestion, index: index, highlightedIndex: highlightedIndex, isSelected: input.value ===
                    getChoiceValue(suggestion), filterValue: filterValue, getSuggestionText: getChoiceText }, getItemProps({
                item: suggestion,
            })))); }))));
    }));
};
var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
}, { name: 'RaAutocompleteInput' });
export default AutocompleteInput;
