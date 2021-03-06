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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Route, useRouteMatch, useLocation } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { escapePath, FormWithRedirect } from 'ra-core';
import get from 'lodash/get';
import Toolbar from './Toolbar';
import TabbedFormTabs, { getTabFullPath } from './TabbedFormTabs';
/**
 * Form layout where inputs are divided by tab, one input per line.
 *
 * Pass FormTab components as children.
 *
 * @example
 *
 * import React from 'react';
 * import {
 *     Edit,
 *     TabbedForm,
 *     FormTab,
 *     Datagrid,
 *     TextField,
 *     DateField,
 *     TextInput,
 *     ReferenceManyField,
 *     NumberInput,
 *     DateInput,
 *     BooleanInput,
 *     EditButton
 * } from 'react-admin';
 *
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <TabbedForm>
 *             <FormTab label="summary">
 *                 <TextInput disabled label="Id" source="id" />
 *                 <TextInput source="title" validate={required()} />
 *                 <TextInput multiline source="teaser" validate={required()} />
 *             </FormTab>
 *             <FormTab label="body">
 *                 <RichTextInput source="body" validate={required()} addLabel={false} />
 *             </FormTab>
 *             <FormTab label="Miscellaneous">
 *                 <TextInput label="Password (if protected post)" source="password" type="password" />
 *                 <DateInput label="Publication date" source="published_at" />
 *                 <NumberInput source="average_note" validate={[ number(), minValue(0) ]} />
 *                 <BooleanInput label="Allow comments?" source="commentable" defaultValue />
 *                 <TextInput disabled label="Nb views" source="views" />
 *             </FormTab>
 *             <FormTab label="comments">
 *                 <ReferenceManyField reference="comments" target="post_id" addLabel={false}>
 *                     <Datagrid>
 *                         <TextField source="body" />
 *                         <DateField source="created_at" />
 *                         <EditButton />
 *                     </Datagrid>
 *                 </ReferenceManyField>
 *             </FormTab>
 *         </TabbedForm>
 *     </Edit>
 * );
 *
 * @typedef {object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {ReactElement[]} FormTab elements
 * @prop {object} initialValues
 * @prop {function} validate
 * @prop {boolean} submitOnEnter
 * @prop {string} redirect
 * @prop {ReactElement} toolbar The element displayed at the bottom of the form, contzining the SaveButton
 * @prop {string} variant Apply variant to all inputs. Possible values are 'standard', 'outlined', and 'filled' (default)
 * @prop {string} margin Apply variant to all inputs. Possible values are 'none', 'normal', and 'dense' (default)
 *
 * @param {Prop} props
 */
var TabbedForm = function (props) { return (React.createElement(FormWithRedirect, __assign({}, props, { render: function (formProps) { return React.createElement(TabbedFormView, __assign({}, formProps)); } }))); };
TabbedForm.propTypes = {
    children: PropTypes.node,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    initialValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    save: PropTypes.func,
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    undoable: PropTypes.bool,
    validate: PropTypes.func,
};
var useStyles = makeStyles(function (theme) { return ({
    errorTabButton: { color: theme.palette.error.main },
    content: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}); }, { name: 'RaTabbedForm' });
export var TabbedFormView = function (_a) {
    var basePath = _a.basePath, children = _a.children, className = _a.className, classesOverride = _a.classes, form = _a.form, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, pristine = _a.pristine, record = _a.record, defaultRedirect = _a.redirect, resource = _a.resource, saving = _a.saving, setRedirect = _a.setRedirect, submitOnEnter = _a.submitOnEnter, tabs = _a.tabs, toolbar = _a.toolbar, translate = _a.translate, undoable = _a.undoable, value = _a.value, variant = _a.variant, margin = _a.margin, rest = __rest(_a, ["basePath", "children", "className", "classes", "form", "handleSubmit", "handleSubmitWithRedirect", "invalid", "pristine", "record", "redirect", "resource", "saving", "setRedirect", "submitOnEnter", "tabs", "toolbar", "translate", "undoable", "value", "variant", "margin"]);
    var tabsWithErrors = findTabsWithErrors(children, form.getState().errors);
    var classes = useStyles({ classes: classesOverride });
    var match = useRouteMatch();
    var location = useLocation();
    var url = match ? match.url : location.pathname;
    return (React.createElement("form", __assign({ className: classnames('tabbed-form', className) }, sanitizeRestProps(rest)),
        React.cloneElement(tabs, {
            classes: classes,
            url: url,
            tabsWithErrors: tabsWithErrors,
        }, children),
        React.createElement(Divider, null),
        React.createElement("div", { className: classes.content }, Children.map(children, function (tab, index) {
            return tab && (React.createElement(Route, { exact: true, path: escapePath(getTabFullPath(tab, index, url)) }, function (routeProps) {
                return isValidElement(tab)
                    ? React.cloneElement(tab, {
                        intent: 'content',
                        resource: resource,
                        record: record,
                        basePath: basePath,
                        hidden: !routeProps.match,
                        variant: tab.props.variant || variant,
                        margin: tab.props.margin || margin,
                    })
                    : null;
            }));
        })),
        toolbar &&
            React.cloneElement(toolbar, {
                basePath: basePath,
                className: 'toolbar',
                handleSubmitWithRedirect: handleSubmitWithRedirect,
                handleSubmit: handleSubmit,
                invalid: invalid,
                pristine: pristine,
                record: record,
                redirect: defaultRedirect,
                resource: resource,
                saving: saving,
                submitOnEnter: submitOnEnter,
                undoable: undoable,
            })));
};
TabbedFormView.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    initialValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    location: PropTypes.object,
    match: PropTypes.object,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    save: PropTypes.func,
    saving: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    tabs: PropTypes.element.isRequired,
    tabsWithErrors: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.element,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
    validate: PropTypes.func,
    value: PropTypes.number,
    version: PropTypes.number,
};
TabbedFormView.defaultProps = {
    submitOnEnter: true,
    tabs: React.createElement(TabbedFormTabs, null),
    toolbar: React.createElement(Toolbar, null),
};
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, array = _a.array, asyncBlurFields = _a.asyncBlurFields, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, destroy = _a.destroy, dirty = _a.dirty, dirtyFields = _a.dirtyFields, dirtyFieldsSinceLastSubmit = _a.dirtyFieldsSinceLastSubmit, dirtySinceLastSubmit = _a.dirtySinceLastSubmit, dispatch = _a.dispatch, form = _a.form, handleSubmit = _a.handleSubmit, hasSubmitErrors = _a.hasSubmitErrors, hasValidationErrors = _a.hasValidationErrors, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, pristine = _a.pristine, pure = _a.pure, redirect = _a.redirect, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, staticContext = _a.staticContext, submit = _a.submit, submitAsSideEffect = _a.submitAsSideEffect, submitError = _a.submitError, submitErrors = _a.submitErrors, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, translate = _a.translate, triggerSubmit = _a.triggerSubmit, undoable = _a.undoable, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, validating = _a.validating, _reduxForm = _a._reduxForm, props = __rest(_a, ["anyTouched", "array", "asyncBlurFields", "asyncValidate", "asyncValidating", "autofill", "blur", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "destroy", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "dispatch", "form", "handleSubmit", "hasSubmitErrors", "hasValidationErrors", "initialize", "initialized", "initialValues", "pristine", "pure", "redirect", "reset", "resetSection", "save", "staticContext", "submit", "submitAsSideEffect", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "submitting", "touch", "translate", "triggerSubmit", "undoable", "untouch", "valid", "validate", "validating", "_reduxForm"]);
    return props;
};
export var findTabsWithErrors = function (children, errors) {
    return Children.toArray(children).reduce(function (acc, child) {
        if (!isValidElement(child)) {
            return acc;
        }
        var inputs = Children.toArray(child.props.children);
        if (inputs.some(function (input) {
            return isValidElement(input) && get(errors, input.props.source);
        })) {
            return __spreadArrays(acc, [child.props.label]);
        }
        return acc;
    }, []);
};
export default TabbedForm;
