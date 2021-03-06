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
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import lodashSet from 'lodash/set';
import lodashGet from 'lodash/get';
import FilterFormInput from './FilterFormInput';
var useStyles = makeStyles(function (theme) { return ({
    form: {
        marginTop: -theme.spacing(2),
        paddingTop: 0,
        display: 'flex',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        minHeight: theme.spacing(9.5),
    },
    clearFix: { clear: 'right' },
}); }, { name: 'RaFilterForm' });
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, destroy = _a.destroy, dirty = _a.dirty, dirtyFields = _a.dirtyFields, dirtyFieldsSinceLastSubmit = _a.dirtyFieldsSinceLastSubmit, dirtySinceLastSubmit = _a.dirtySinceLastSubmit, dispatch = _a.dispatch, displayedFilters = _a.displayedFilters, errors = _a.errors, filters = _a.filters, filterValues = _a.filterValues, form = _a.form, handleSubmit = _a.handleSubmit, hasSubmitErrors = _a.hasSubmitErrors, hasValidationErrors = _a.hasValidationErrors, hideFilter = _a.hideFilter, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, invalid = _a.invalid, modified = _a.modified, pristine = _a.pristine, pure = _a.pure, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, setFilter = _a.setFilter, setFilters = _a.setFilters, submit = _a.submit, submitAsSideEffect = _a.submitAsSideEffect, submitError = _a.submitError, submitErrors = _a.submitErrors, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, touched = _a.touched, triggerSubmit = _a.triggerSubmit, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, validating = _a.validating, values = _a.values, visited = _a.visited, __versions = _a.__versions, props = __rest(_a, ["anyTouched", "asyncValidate", "asyncValidating", "autofill", "blur", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "destroy", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "dispatch", "displayedFilters", "errors", "filters", "filterValues", "form", "handleSubmit", "hasSubmitErrors", "hasValidationErrors", "hideFilter", "initialize", "initialized", "initialValues", "invalid", "modified", "pristine", "pure", "reset", "resetSection", "save", "setFilter", "setFilters", "submit", "submitAsSideEffect", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "submitting", "touch", "touched", "triggerSubmit", "untouch", "valid", "validate", "validating", "values", "visited", "__versions"]);
    return props;
};
export var FilterForm = function (_a) {
    var _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, resource = _a.resource, margin = _a.margin, variant = _a.variant, filters = _a.filters, displayedFilters = _a.displayedFilters, hideFilter = _a.hideFilter, initialValues = _a.initialValues, rest = __rest(_a, ["classes", "className", "resource", "margin", "variant", "filters", "displayedFilters", "hideFilter", "initialValues"]);
    useEffect(function () {
        filters.forEach(function (filter) {
            if (filter.props.alwaysOn && filter.props.defaultValue) {
                throw new Error('Cannot use alwaysOn and defaultValue on a filter input. Please set the filterDefaultValues props on the <List> element instead.');
            }
        });
    }, [filters]);
    var getShownFilters = function () {
        return filters.filter(function (filterElement) {
            return filterElement.props.alwaysOn ||
                displayedFilters[filterElement.props.source] ||
                typeof lodashGet(initialValues, filterElement.props.source) !==
                    'undefined';
        });
    };
    var handleHide = useCallback(function (event) { return hideFilter(event.currentTarget.dataset.key); }, [hideFilter]);
    return (React.createElement("form", __assign({ className: classnames(className, classes.form) }, sanitizeRestProps(rest), { onSubmit: handleSubmit }),
        getShownFilters().map(function (filterElement) { return (React.createElement(FilterFormInput, { key: filterElement.props.source, filterElement: filterElement, handleHide: handleHide, resource: resource, margin: margin, variant: variant })); }),
        React.createElement("div", { className: classes.clearFix })));
};
var handleSubmit = function (event) {
    event.preventDefault();
    return false;
};
FilterForm.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    classes: PropTypes.object,
    className: PropTypes.string,
};
export var mergeInitialValuesWithDefaultValues = function (_a) {
    var initialValues = _a.initialValues, filters = _a.filters;
    return (__assign(__assign({}, filters
        .filter(function (filterElement) {
        return filterElement.props.alwaysOn && filterElement.props.defaultValue;
    })
        .reduce(function (acc, filterElement) {
        return lodashSet(__assign({}, acc), filterElement.props.source, filterElement.props.defaultValue);
    }, {})), initialValues));
};
var EnhancedFilterForm = function (_a) {
    var classesOverride = _a.classes, props = __rest(_a, ["classes"]);
    var classes = useStyles({ classes: classesOverride });
    var mergedInitialValuesWithDefaultValues = mergeInitialValuesWithDefaultValues(props);
    var initialValues = props.initialValues, rest = __rest(props, ["initialValues"]);
    return (React.createElement(Form, { onSubmit: handleFinalFormSubmit, initialValues: mergedInitialValuesWithDefaultValues, mutators: __assign({}, arrayMutators), render: function (formProps) { return (React.createElement(React.Fragment, null,
            React.createElement(FormSpy, { subscription: FormSpySubscription, onChange: function (_a) {
                    var pristine = _a.pristine, values = _a.values;
                    if (pristine) {
                        return;
                    }
                    props && props.setFilters(values);
                } }),
            React.createElement(FilterForm, __assign({ classes: classes }, formProps, rest)))); } }));
};
var handleFinalFormSubmit = function () { };
// Options to instruct the FormSpy that it should only listen to the values and pristine changes
var FormSpySubscription = { values: true, pristine: true };
export default EnhancedFilterForm;
