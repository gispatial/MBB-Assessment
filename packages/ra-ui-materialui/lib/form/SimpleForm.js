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
var ra_core_1 = require("ra-core");
var FormInput_1 = __importDefault(require("./FormInput"));
var Toolbar_1 = __importDefault(require("./Toolbar"));
var CardContentInner_1 = __importDefault(require("../layout/CardContentInner"));
/**
 * Form with a one column layout, one input per line.
 *
 * Pass input components as children.
 *
 * @example
 *
 * import React from 'react';
 * import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';
 * import RichTextInput from 'ra-input-rich-text';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *             <TextInput source="teaser" options={{ multiLine: true }} />
 *             <RichTextInput source="body" />
 *             <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * @typedef {object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {ReactElement[]} children Input elements
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
var SimpleForm = function (props) { return (react_1.default.createElement(ra_core_1.FormWithRedirect, __assign({}, props, { render: function (formProps) { return react_1.default.createElement(SimpleFormView, __assign({}, formProps)); } }))); };
SimpleForm.propTypes = {
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
    version: prop_types_1.default.number,
};
var SimpleFormView = function (_a) {
    var basePath = _a.basePath, children = _a.children, className = _a.className, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, margin = _a.margin, pristine = _a.pristine, record = _a.record, redirect = _a.redirect, resource = _a.resource, saving = _a.saving, submitOnEnter = _a.submitOnEnter, toolbar = _a.toolbar, undoable = _a.undoable, variant = _a.variant, rest = __rest(_a, ["basePath", "children", "className", "handleSubmit", "handleSubmitWithRedirect", "invalid", "margin", "pristine", "record", "redirect", "resource", "saving", "submitOnEnter", "toolbar", "undoable", "variant"]);
    return (react_1.default.createElement("form", __assign({ className: classnames_1.default('simple-form', className) }, sanitizeRestProps(rest)),
        react_1.default.createElement(CardContentInner_1.default, null, react_1.Children.map(children, function (input) {
            return input && (react_1.default.createElement(FormInput_1.default, { basePath: basePath, input: input, record: record, resource: resource, variant: input.props.variant || variant, margin: input.props.margin || margin }));
        })),
        toolbar &&
            react_1.default.cloneElement(toolbar, {
                basePath: basePath,
                handleSubmitWithRedirect: handleSubmitWithRedirect,
                handleSubmit: handleSubmit,
                invalid: invalid,
                pristine: pristine,
                record: record,
                redirect: redirect,
                resource: resource,
                saving: saving,
                submitOnEnter: submitOnEnter,
                undoable: undoable,
            })));
};
SimpleFormView.propTypes = {
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.node,
    className: prop_types_1.default.string,
    handleSubmit: prop_types_1.default.func,
    invalid: prop_types_1.default.bool,
    pristine: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    save: prop_types_1.default.func,
    saving: prop_types_1.default.bool,
    submitOnEnter: prop_types_1.default.bool,
    toolbar: prop_types_1.default.element,
    undoable: prop_types_1.default.bool,
    validate: prop_types_1.default.func,
};
SimpleFormView.defaultProps = {
    submitOnEnter: true,
    toolbar: react_1.default.createElement(Toolbar_1.default, null),
};
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, array = _a.array, asyncBlurFields = _a.asyncBlurFields, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, destroy = _a.destroy, dirty = _a.dirty, dirtyFields = _a.dirtyFields, dirtyFieldsSinceLastSubmit = _a.dirtyFieldsSinceLastSubmit, dirtySinceLastSubmit = _a.dirtySinceLastSubmit, dispatch = _a.dispatch, form = _a.form, handleSubmit = _a.handleSubmit, hasSubmitErrors = _a.hasSubmitErrors, hasValidationErrors = _a.hasValidationErrors, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, pristine = _a.pristine, pure = _a.pure, redirect = _a.redirect, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, setRedirect = _a.setRedirect, submit = _a.submit, submitError = _a.submitError, submitErrors = _a.submitErrors, submitAsSideEffect = _a.submitAsSideEffect, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, translate = _a.translate, triggerSubmit = _a.triggerSubmit, undoable = _a.undoable, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, validating = _a.validating, _reduxForm = _a._reduxForm, props = __rest(_a, ["anyTouched", "array", "asyncBlurFields", "asyncValidate", "asyncValidating", "autofill", "blur", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "destroy", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "dispatch", "form", "handleSubmit", "hasSubmitErrors", "hasValidationErrors", "initialize", "initialized", "initialValues", "pristine", "pure", "redirect", "reset", "resetSection", "save", "setRedirect", "submit", "submitError", "submitErrors", "submitAsSideEffect", "submitFailed", "submitSucceeded", "submitting", "touch", "translate", "triggerSubmit", "undoable", "untouch", "valid", "validate", "validating", "_reduxForm"]);
    return props;
};
exports.default = SimpleForm;
