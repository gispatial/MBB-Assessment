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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var react_router_dom_1 = require("react-router-dom");
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var get_1 = __importDefault(require("lodash/get"));
var Toolbar_1 = __importDefault(require("./Toolbar"));
var TabbedFormTabs_1 = __importStar(require("./TabbedFormTabs"));
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
var TabbedForm = function (props) { return (react_1.default.createElement(ra_core_1.FormWithRedirect, __assign({}, props, { render: function (formProps) { return react_1.default.createElement(exports.TabbedFormView, __assign({}, formProps)); } }))); };
TabbedForm.propTypes = {
    children: prop_types_1.default.node,
    defaultValue: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.func]),
    initialValues: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.func]),
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    save: prop_types_1.default.func,
    saving: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.bool]),
    submitOnEnter: prop_types_1.default.bool,
    undoable: prop_types_1.default.bool,
    validate: prop_types_1.default.func,
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    errorTabButton: { color: theme.palette.error.main },
    content: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}); }, { name: 'RaTabbedForm' });
exports.TabbedFormView = function (_a) {
    var basePath = _a.basePath, children = _a.children, className = _a.className, classesOverride = _a.classes, form = _a.form, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, pristine = _a.pristine, record = _a.record, defaultRedirect = _a.redirect, resource = _a.resource, saving = _a.saving, setRedirect = _a.setRedirect, submitOnEnter = _a.submitOnEnter, tabs = _a.tabs, toolbar = _a.toolbar, translate = _a.translate, undoable = _a.undoable, value = _a.value, variant = _a.variant, margin = _a.margin, rest = __rest(_a, ["basePath", "children", "className", "classes", "form", "handleSubmit", "handleSubmitWithRedirect", "invalid", "pristine", "record", "redirect", "resource", "saving", "setRedirect", "submitOnEnter", "tabs", "toolbar", "translate", "undoable", "value", "variant", "margin"]);
    var tabsWithErrors = exports.findTabsWithErrors(children, form.getState().errors);
    var classes = useStyles({ classes: classesOverride });
    var match = react_router_dom_1.useRouteMatch();
    var location = react_router_dom_1.useLocation();
    var url = match ? match.url : location.pathname;
    return (react_1.default.createElement("form", __assign({ className: classnames_1.default('tabbed-form', className) }, sanitizeRestProps(rest)),
        react_1.default.cloneElement(tabs, {
            classes: classes,
            url: url,
            tabsWithErrors: tabsWithErrors,
        }, children),
        react_1.default.createElement(Divider_1.default, null),
        react_1.default.createElement("div", { className: classes.content }, react_1.Children.map(children, function (tab, index) {
            return tab && (react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: ra_core_1.escapePath(TabbedFormTabs_1.getTabFullPath(tab, index, url)) }, function (routeProps) {
                return react_1.isValidElement(tab)
                    ? react_1.default.cloneElement(tab, {
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
            react_1.default.cloneElement(toolbar, {
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
exports.TabbedFormView.propTypes = {
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.node,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    defaultValue: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.func]),
    initialValues: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.func]),
    handleSubmit: prop_types_1.default.func,
    invalid: prop_types_1.default.bool,
    location: prop_types_1.default.object,
    match: prop_types_1.default.object,
    pristine: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    resource: prop_types_1.default.string,
    save: prop_types_1.default.func,
    saving: prop_types_1.default.bool,
    submitOnEnter: prop_types_1.default.bool,
    tabs: prop_types_1.default.element.isRequired,
    tabsWithErrors: prop_types_1.default.arrayOf(prop_types_1.default.string),
    toolbar: prop_types_1.default.element,
    translate: prop_types_1.default.func,
    undoable: prop_types_1.default.bool,
    validate: prop_types_1.default.func,
    value: prop_types_1.default.number,
    version: prop_types_1.default.number,
};
exports.TabbedFormView.defaultProps = {
    submitOnEnter: true,
    tabs: react_1.default.createElement(TabbedFormTabs_1.default, null),
    toolbar: react_1.default.createElement(Toolbar_1.default, null),
};
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, array = _a.array, asyncBlurFields = _a.asyncBlurFields, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, destroy = _a.destroy, dirty = _a.dirty, dirtyFields = _a.dirtyFields, dirtyFieldsSinceLastSubmit = _a.dirtyFieldsSinceLastSubmit, dirtySinceLastSubmit = _a.dirtySinceLastSubmit, dispatch = _a.dispatch, form = _a.form, handleSubmit = _a.handleSubmit, hasSubmitErrors = _a.hasSubmitErrors, hasValidationErrors = _a.hasValidationErrors, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, pristine = _a.pristine, pure = _a.pure, redirect = _a.redirect, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, staticContext = _a.staticContext, submit = _a.submit, submitAsSideEffect = _a.submitAsSideEffect, submitError = _a.submitError, submitErrors = _a.submitErrors, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, translate = _a.translate, triggerSubmit = _a.triggerSubmit, undoable = _a.undoable, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, validating = _a.validating, _reduxForm = _a._reduxForm, props = __rest(_a, ["anyTouched", "array", "asyncBlurFields", "asyncValidate", "asyncValidating", "autofill", "blur", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "destroy", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "dispatch", "form", "handleSubmit", "hasSubmitErrors", "hasValidationErrors", "initialize", "initialized", "initialValues", "pristine", "pure", "redirect", "reset", "resetSection", "save", "staticContext", "submit", "submitAsSideEffect", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "submitting", "touch", "translate", "triggerSubmit", "undoable", "untouch", "valid", "validate", "validating", "_reduxForm"]);
    return props;
};
exports.findTabsWithErrors = function (children, errors) {
    return react_1.Children.toArray(children).reduce(function (acc, child) {
        if (!react_1.isValidElement(child)) {
            return acc;
        }
        var inputs = react_1.Children.toArray(child.props.children);
        if (inputs.some(function (input) {
            return react_1.isValidElement(input) && get_1.default(errors, input.props.source);
        })) {
            return __spreadArrays(acc, [child.props.label]);
        }
        return acc;
    }, []);
};
exports.default = TabbedForm;
