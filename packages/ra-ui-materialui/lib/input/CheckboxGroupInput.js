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
var get_1 = __importDefault(require("lodash/get"));
var FormLabel_1 = __importDefault(require("@material-ui/core/FormLabel"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
var FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var CheckboxGroupInputItem_1 = __importDefault(require("./CheckboxGroupInputItem"));
var InputHelperText_1 = __importDefault(require("./InputHelperText"));
var sanitizeRestProps = function (_a) {
    var setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, loaded = _a.loaded, rest = __rest(_a, ["setFilter", "setPagination", "setSort", "loaded"]);
    return sanitizeRestProps_1.default(rest);
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {},
    label: {
        transform: 'translate(0, 8px) scale(0.75)',
        transformOrigin: "top " + (theme.direction === 'ltr' ? 'left' : 'right'),
    },
}); }, { name: 'RaCheckboxGroupInput' });
/**
 * An Input component for a checkbox group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * The expected input must be an array of identifiers (e.g. [12, 31]) which correspond to
 * the 'optionValue' of 'choices' attribute objects.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *     { id: 12, name: 'Ray Hakt' },
 *     { id: 31, name: 'Ann Gullar' },
 *     { id: 42, name: 'Sean Phonee' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi' },
 *    { _id: 456, full_name: 'Jane Austen' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} optionText="full_name" optionValue="_id" />
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
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.category.programming' },
 *    { id: 'lifestyle', name: 'myroot.category.lifestyle' },
 *    { id: 'photography', name: 'myroot.category.photography' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <CheckboxGroupInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Checkbox> components
 */
var CheckboxGroupInput = function (_a) {
    var _b = _a.choices, choices = _b === void 0 ? [] : _b, format = _a.format, helperText = _a.helperText, label = _a.label, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, optionText = _a.optionText, optionValue = _a.optionValue, options = _a.options, parse = _a.parse, resource = _a.resource, row = _a.row, source = _a.source, translate = _a.translate, translateChoice = _a.translateChoice, validate = _a.validate, rest = __rest(_a, ["choices", "format", "helperText", "label", "margin", "onBlur", "onChange", "onFocus", "optionText", "optionValue", "options", "parse", "resource", "row", "source", "translate", "translateChoice", "validate"]);
    var classes = useStyles({});
    var _d = ra_core_1.useInput(__assign({ format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate }, rest)), id = _d.id, _e = _d.input, finalFormOnChange = _e.onChange, finalFormOnBlur = _e.onBlur, value = _e.value, isRequired = _d.isRequired, _f = _d.meta, error = _f.error, touched = _f.touched;
    var handleCheck = react_1.useCallback(function (event, isChecked) {
        var newValue;
        try {
            // try to convert string value to number, e.g. '123'
            newValue = JSON.parse(event.target.value);
        }
        catch (e) {
            // impossible to convert value, e.g. 'abc'
            newValue = event.target.value;
        }
        if (isChecked) {
            finalFormOnChange(__spreadArrays((value || []), [newValue]));
        }
        else {
            finalFormOnChange(value.filter(function (v) { return v != newValue; })); // eslint-disable-line eqeqeq
        }
        finalFormOnBlur(); // HACK: See https://github.com/final-form/react-final-form/issues/365#issuecomment-515045503
    }, [finalFormOnChange, finalFormOnBlur, value]);
    return (react_1.default.createElement(FormControl_1.default, __assign({ component: "fieldset", margin: margin, error: touched && !!error }, sanitizeRestProps(rest)),
        react_1.default.createElement(FormLabel_1.default, { component: "legend", className: classes.label },
            react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        react_1.default.createElement(FormGroup_1.default, { row: row }, choices.map(function (choice) { return (react_1.default.createElement(CheckboxGroupInputItem_1.default, { key: get_1.default(choice, optionValue), choice: choice, id: id, onChange: handleCheck, options: options, optionText: optionText, optionValue: optionValue, translateChoice: translateChoice, value: value })); })),
        react_1.default.createElement(FormHelperText_1.default, null,
            react_1.default.createElement(InputHelperText_1.default, { touched: touched, error: error, helperText: helperText }))));
};
CheckboxGroupInput.propTypes = {
    choices: prop_types_1.default.arrayOf(prop_types_1.default.object),
    className: prop_types_1.default.string,
    label: prop_types_1.default.string,
    source: prop_types_1.default.string,
    options: prop_types_1.default.object,
    optionText: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.func,
        prop_types_1.default.element,
    ]),
    optionValue: prop_types_1.default.string,
    row: prop_types_1.default.bool,
    resource: prop_types_1.default.string,
    translateChoice: prop_types_1.default.bool,
};
CheckboxGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
    fullWidth: true,
    row: true,
};
exports.default = CheckboxGroupInput;
