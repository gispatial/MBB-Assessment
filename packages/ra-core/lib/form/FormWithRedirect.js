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
var react_final_form_1 = require("react-final-form");
var final_form_arrays_1 = __importDefault(require("final-form-arrays"));
var useInitializeFormWithRecord_1 = __importDefault(require("./useInitializeFormWithRecord"));
var sanitizeEmptyValues_1 = __importDefault(require("./sanitizeEmptyValues"));
var getFormInitialValues_1 = __importDefault(require("./getFormInitialValues"));
/**
 * Wrapper around react-final-form's Form to handle redirection on submit,
 * legacy defaultValue prop, and array inputs.
 *
 * Requires a render function, just like react-final-form
 *
 * @example
 *
 * const SimpleForm = props => (
 *    <FormWithRedirect
 *        {...props}
 *        render={formProps => <SimpleFormView {...formProps} />}
 *    />
 * );
 *
 * @typedef {object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {object} initialValues
 * @prop {function} validate
 * @prop {boolean} submitOnEnter
 * @prop {string} redirect
 *
 * @param {Prop} props
 */
var FormWithRedirect = function (_a) {
    var initialValues = _a.initialValues, debug = _a.debug, decorators = _a.decorators, defaultValue = _a.defaultValue, form = _a.form, initialValuesEqual = _a.initialValuesEqual, _b = _a.keepDirtyOnReinitialize, keepDirtyOnReinitialize = _b === void 0 ? true : _b, _c = _a.mutators, mutators = _c === void 0 ? final_form_arrays_1.default : _c, // FIXME see https://github.com/final-form/react-final-form/issues/704 and https://github.com/microsoft/TypeScript/issues/35771
    record = _a.record, render = _a.render, save = _a.save, saving = _a.saving, _d = _a.subscription, subscription = _d === void 0 ? defaultSubscription : _d, validate = _a.validate, validateOnBlur = _a.validateOnBlur, version = _a.version, props = __rest(_a, ["initialValues", "debug", "decorators", "defaultValue", "form", "initialValuesEqual", "keepDirtyOnReinitialize", "mutators", "record", "render", "save", "saving", "subscription", "validate", "validateOnBlur", "version"]);
    var redirect = react_1.useRef(props.redirect);
    // We don't use state here for two reasons:
    // 1. There no way to execute code only after the state has been updated
    // 2. We don't want the form to rerender when redirect is changed
    var setRedirect = function (newRedirect) {
        redirect.current = newRedirect;
    };
    var finalInitialValues = getFormInitialValues_1.default(initialValues, defaultValue, record);
    var submit = function (values) {
        var finalRedirect = typeof redirect.current === undefined
            ? props.redirect
            : redirect.current;
        var finalValues = sanitizeEmptyValues_1.default(finalInitialValues, values);
        save(finalValues, finalRedirect);
    };
    return (react_1.default.createElement(react_final_form_1.Form, { key: version, debug: debug, decorators: decorators, form: form, initialValues: finalInitialValues, initialValuesEqual: initialValuesEqual, keepDirtyOnReinitialize: keepDirtyOnReinitialize, mutators: mutators, onSubmit: submit, subscription: subscription, validate: validate, validateOnBlur: validateOnBlur }, function (formProps) { return (react_1.default.createElement(FormView, __assign({}, props, formProps, { record: record, setRedirect: setRedirect, saving: formProps.submitting || saving, render: render }))); }));
};
var defaultSubscription = {
    submitting: true,
    pristine: true,
    valid: true,
    invalid: true,
};
var FormView = function (_a) {
    var render = _a.render, props = __rest(_a, ["render"]);
    // if record changes (after a getOne success or a refresh), the form must be updated
    useInitializeFormWithRecord_1.default(props.record);
    var redirect = props.redirect, setRedirect = props.setRedirect, handleSubmit = props.handleSubmit;
    /**
     * We want to let developers define the redirection target from inside the form,
     * e.g. in a <SaveButton redirect="list" />.
     * This callback does two things: handle submit, and change the redirection target.
     * The actual redirection is done in save(), passed by the main controller.
     *
     * If the redirection target doesn't depend on the button clicked, it's a
     * better option to define it directly on the Form component. In that case,
     * using handleSubmit() instead of handleSubmitWithRedirect is fine.
     *
     * @example
     *
     * <Button onClick={() => handleSubmitWithRedirect('edit')}>
     *     Save and edit
     * </Button>
     */
    var handleSubmitWithRedirect = react_1.useCallback(function (redirectTo) {
        if (redirectTo === void 0) { redirectTo = redirect; }
        setRedirect(redirectTo);
        handleSubmit();
    }, [setRedirect, redirect, handleSubmit]);
    return render(__assign(__assign({}, props), { handleSubmitWithRedirect: handleSubmitWithRedirect }));
};
exports.default = FormWithRedirect;
