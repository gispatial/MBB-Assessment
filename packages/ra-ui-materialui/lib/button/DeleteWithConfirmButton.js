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
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var classnames_1 = __importDefault(require("classnames"));
var inflection_1 = __importDefault(require("inflection"));
var ra_core_1 = require("ra-core");
var Confirm_1 = __importDefault(require("../layout/Confirm"));
var Button_1 = __importDefault(require("./Button"));
var DeleteWithConfirmButton = function (_a) {
    var basePath = _a.basePath, classesOverride = _a.classes, className = _a.className, _b = _a.confirmTitle, confirmTitle = _b === void 0 ? 'ra.message.delete_title' : _b, _c = _a.confirmContent, confirmContent = _c === void 0 ? 'ra.message.delete_content' : _c, _d = _a.icon, icon = _d === void 0 ? defaultIcon : _d, _e = _a.label, label = _e === void 0 ? 'ra.action.delete' : _e, onClick = _a.onClick, record = _a.record, resource = _a.resource, _f = _a.redirect, redirectTo = _f === void 0 ? 'list' : _f, rest = __rest(_a, ["basePath", "classes", "className", "confirmTitle", "confirmContent", "icon", "label", "onClick", "record", "resource", "redirect"]);
    var _g = react_1.useState(false), open = _g[0], setOpen = _g[1];
    var translate = ra_core_1.useTranslate();
    var notify = ra_core_1.useNotify();
    var redirect = ra_core_1.useRedirect();
    var refresh = ra_core_1.useRefresh();
    var classes = useStyles({ classes: classesOverride });
    var _h = ra_core_1.useDelete(resource, record && record.id, record, {
        action: ra_core_1.CRUD_DELETE,
        onSuccess: function () {
            notify('ra.notification.deleted', 'info', { smart_count: 1 });
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: function (error) {
            notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
            setOpen(false);
        },
        undoable: false,
    }), deleteOne = _h[0], loading = _h[1].loading;
    var handleClick = function (e) {
        setOpen(true);
        e.stopPropagation();
    };
    var handleDialogClose = function (e) {
        setOpen(false);
        e.stopPropagation();
    };
    var handleDelete = react_1.useCallback(function (event) {
        deleteOne();
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteOne, onClick]);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Button_1.default, __assign({ onClick: handleClick, label: label, className: classnames_1.default('ra-delete-button', classes.deleteButton, className), key: "button" }, sanitizeRestProps(rest)), icon),
        react_1.default.createElement(Confirm_1.default, { isOpen: open, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                name: inflection_1.default.humanize(translate("resources." + resource + ".name", {
                    smart_count: 1,
                    _: inflection_1.default.singularize(resource),
                }), true),
                id: record.id,
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
};
var defaultIcon = react_1.default.createElement(Delete_1.default, null);
var sanitizeRestProps = function (_a) {
    var handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, label = _a.label, pristine = _a.pristine, saving = _a.saving, submitOnEnter = _a.submitOnEnter, undoable = _a.undoable, rest = __rest(_a, ["handleSubmit", "handleSubmitWithRedirect", "invalid", "label", "pristine", "saving", "submitOnEnter", "undoable"]);
    return rest;
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: colorManipulator_1.fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
}); }, { name: 'RaDeleteWithConfirmButton' });
DeleteWithConfirmButton.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    confirmTitle: prop_types_1.default.string,
    confirmContent: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.any,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    resource: prop_types_1.default.string,
    icon: prop_types_1.default.element,
};
exports.default = DeleteWithConfirmButton;
