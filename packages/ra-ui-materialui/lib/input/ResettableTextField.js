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
var InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var styles_1 = require("@material-ui/core/styles");
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var ra_core_1 = require("ra-core");
var useStyles = styles_1.makeStyles({
    clearIcon: {
        height: 16,
        width: 0,
    },
    visibleClearIcon: {
        width: 16,
    },
    clearButton: {
        height: 24,
        width: 24,
        padding: 0,
    },
    selectAdornment: {
        position: 'absolute',
        right: 24,
    },
    inputAdornedEnd: {
        paddingRight: 0,
    },
}, { name: 'RaResettableTextField' });
var handleMouseDownClearButton = function (event) {
    event.preventDefault();
};
/**
 * An override of the default Material-UI TextField which is resettable
 */
function ResettableTextField(_a) {
    var classesOverride = _a.classes, clearAlwaysVisible = _a.clearAlwaysVisible, InputProps = _a.InputProps, value = _a.value, resettable = _a.resettable, disabled = _a.disabled, _b = _a.variant, variant = _b === void 0 ? 'filled' : _b, _c = _a.margin, margin = _c === void 0 ? 'dense' : _c, props = __rest(_a, ["classes", "clearAlwaysVisible", "InputProps", "value", "resettable", "disabled", "variant", "margin"]);
    var classes = useStyles({ classes: classesOverride });
    var translate = ra_core_1.useTranslate();
    var onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur;
    var handleClickClearButton = react_1.useCallback(function (event) {
        event.preventDefault();
        onChange('');
    }, [onChange]);
    var handleFocus = react_1.useCallback(function (event) {
        onFocus && onFocus(event);
    }, [onFocus]);
    var handleBlur = react_1.useCallback(function (event) {
        onBlur && onBlur(event);
    }, [onBlur]);
    var clearButton = classes.clearButton, clearIcon = classes.clearIcon, inputAdornedEnd = classes.inputAdornedEnd, selectAdornment = classes.selectAdornment, visibleClearButton = classes.visibleClearButton, visibleClearIcon = classes.visibleClearIcon, restClasses = __rest(classes, ["clearButton", "clearIcon", "inputAdornedEnd", "selectAdornment", "visibleClearButton", "visibleClearIcon"]);
    var _d = InputProps || {}, endAdornment = _d.endAdornment, InputPropsWithoutEndAdornment = __rest(_d, ["endAdornment"]);
    if (clearAlwaysVisible && endAdornment) {
        throw new Error('ResettableTextField cannot display both an endAdornment and a clear button always visible');
    }
    var getEndAdornment = function () {
        var _a;
        if (!resettable) {
            return endAdornment;
        }
        else if (!value) {
            if (clearAlwaysVisible) {
                // show clear button, inactive
                return (react_1.default.createElement(InputAdornment_1.default, { position: "end", classes: {
                        root: props.select ? selectAdornment : null,
                    } },
                    react_1.default.createElement(IconButton_1.default, { className: clearButton, "aria-label": translate('ra.action.clear_input_value'), title: translate('ra.action.clear_input_value'), disableRipple: true, disabled: true },
                        react_1.default.createElement(Clear_1.default, { className: classnames_1.default(clearIcon, visibleClearIcon) }))));
            }
            else {
                if (endAdornment) {
                    return endAdornment;
                }
                else {
                    // show spacer
                    return (react_1.default.createElement(InputAdornment_1.default, { position: "end", classes: {
                            root: props.select ? selectAdornment : null,
                        } },
                        react_1.default.createElement("span", { className: clearButton }, "\u00A0")));
                }
            }
        }
        else {
            // show clear
            return (react_1.default.createElement(InputAdornment_1.default, { position: "end", classes: {
                    root: props.select ? selectAdornment : null,
                } },
                react_1.default.createElement(IconButton_1.default, { className: clearButton, "aria-label": translate('ra.action.clear_input_value'), title: translate('ra.action.clear_input_value'), disableRipple: true, onClick: handleClickClearButton, onMouseDown: handleMouseDownClearButton, disabled: disabled },
                    react_1.default.createElement(Clear_1.default, { className: classnames_1.default(clearIcon, (_a = {},
                            _a[visibleClearIcon] = clearAlwaysVisible || value,
                            _a)) }))));
        }
    };
    return (react_1.default.createElement(TextField_1.default, __assign({ classes: restClasses, value: value, InputProps: __assign({ classes: props.select && variant === 'filled'
                ? { adornedEnd: inputAdornedEnd }
                : {}, endAdornment: getEndAdornment() }, InputPropsWithoutEndAdornment), disabled: disabled, variant: variant, margin: margin }, props, { onFocus: handleFocus, onBlur: handleBlur })));
}
ResettableTextField.propTypes = {
    classes: prop_types_1.default.object,
    clearAlwaysVisible: prop_types_1.default.bool,
    disabled: prop_types_1.default.bool,
    InputProps: prop_types_1.default.object,
    onBlur: prop_types_1.default.func,
    onChange: prop_types_1.default.func.isRequired,
    onFocus: prop_types_1.default.func,
    resettable: prop_types_1.default.bool,
    value: prop_types_1.default.any.isRequired,
};
exports.default = ResettableTextField;
