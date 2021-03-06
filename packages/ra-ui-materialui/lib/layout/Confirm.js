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
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var CheckCircle_1 = __importDefault(require("@material-ui/icons/CheckCircle"));
var ErrorOutline_1 = __importDefault(require("@material-ui/icons/ErrorOutline"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    contentText: {
        minWidth: 400,
    },
    confirmPrimary: {
        color: theme.palette.primary.main,
    },
    confirmWarning: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: colorManipulator_1.fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
    },
}); }, { name: 'RaConfirm' });
/**
 * Confirmation dialog
 *
 * @example
 * <Confirm
 *     isOpen={true}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     confirm="Yes"
 *     confirmColor="primary"
 *     ConfirmIcon=ActionCheck
 *     CancelIcon=AlertError
 *     cancel="Cancel"
 *     onConfirm={() => { // do something }}
 *     onClose={() => { // do something }}
 * />
 */
var Confirm = function (_a) {
    var _b;
    var isOpen = _a.isOpen, loading = _a.loading, title = _a.title, content = _a.content, confirm = _a.confirm, cancel = _a.cancel, confirmColor = _a.confirmColor, ConfirmIcon = _a.ConfirmIcon, CancelIcon = _a.CancelIcon, onClose = _a.onClose, onConfirm = _a.onConfirm, classesOverride = _a.classes, _c = _a.translateOptions, translateOptions = _c === void 0 ? {} : _c;
    var classes = useStyles({ classes: classesOverride });
    var translate = ra_core_1.useTranslate();
    var handleConfirm = react_1.useCallback(function (e) {
        e.stopPropagation();
        onConfirm();
    }, [onConfirm]);
    var handleClick = react_1.useCallback(function (e) {
        e.stopPropagation();
    }, []);
    return (react_1.default.createElement(Dialog_1.default, { open: isOpen, onClose: onClose, onClick: handleClick, "aria-labelledby": "alert-dialog-title" },
        react_1.default.createElement(DialogTitle_1.default, { id: "alert-dialog-title" }, translate(title, __assign({ _: title }, translateOptions))),
        react_1.default.createElement(DialogContent_1.default, null,
            react_1.default.createElement(DialogContentText_1.default, { className: classes.contentText }, translate(content, __assign({ _: content }, translateOptions)))),
        react_1.default.createElement(DialogActions_1.default, null,
            react_1.default.createElement(Button_1.default, { disabled: loading, onClick: onClose },
                react_1.default.createElement(CancelIcon, { className: classes.iconPaddingStyle }),
                translate(cancel, { _: cancel })),
            react_1.default.createElement(Button_1.default, { disabled: loading, onClick: handleConfirm, className: classnames_1.default('ra-confirm', (_b = {},
                    _b[classes.confirmWarning] = confirmColor === 'warning',
                    _b[classes.confirmPrimary] = confirmColor === 'primary',
                    _b)), autoFocus: true },
                react_1.default.createElement(ConfirmIcon, { className: classes.iconPaddingStyle }),
                translate(confirm, { _: confirm })))));
};
Confirm.propTypes = {
    cancel: prop_types_1.default.string.isRequired,
    classes: prop_types_1.default.object,
    confirm: prop_types_1.default.string.isRequired,
    confirmColor: prop_types_1.default.string.isRequired,
    ConfirmIcon: prop_types_1.default.elementType.isRequired,
    CancelIcon: prop_types_1.default.elementType.isRequired,
    content: prop_types_1.default.string.isRequired,
    isOpen: prop_types_1.default.bool,
    loading: prop_types_1.default.bool,
    onClose: prop_types_1.default.func.isRequired,
    onConfirm: prop_types_1.default.func.isRequired,
    title: prop_types_1.default.string.isRequired,
};
Confirm.defaultProps = {
    cancel: 'ra.action.cancel',
    classes: {},
    confirm: 'ra.action.confirm',
    confirmColor: 'primary',
    ConfirmIcon: CheckCircle_1.default,
    CancelIcon: ErrorOutline_1.default,
    isOpen: false,
};
exports.default = Confirm;
