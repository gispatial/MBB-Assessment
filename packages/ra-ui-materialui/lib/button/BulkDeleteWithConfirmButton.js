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
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var inflection_1 = __importDefault(require("inflection"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var Confirm_1 = __importDefault(require("../layout/Confirm"));
var Button_1 = __importDefault(require("./Button"));
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, crudDeleteMany = _a.crudDeleteMany, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, rest = __rest(_a, ["basePath", "classes", "crudDeleteMany", "filterValues", "label", "resource", "selectedIds"]);
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
}); }, { name: 'RaBulkDeleteWithConfirmButton' });
var BulkDeleteWithConfirmButton = function (_a) {
    var basePath = _a.basePath, classesOverride = _a.classes, confirmTitle = _a.confirmTitle, confirmContent = _a.confirmContent, crudDeleteMany = _a.crudDeleteMany, icon = _a.icon, label = _a.label, onClick = _a.onClick, resource = _a.resource, selectedIds = _a.selectedIds, rest = __rest(_a, ["basePath", "classes", "confirmTitle", "confirmContent", "crudDeleteMany", "icon", "label", "onClick", "resource", "selectedIds"]);
    var _b = react_1.useState(false), isOpen = _b[0], setOpen = _b[1];
    var classes = useStyles({ classes: classesOverride });
    var notify = ra_core_1.useNotify();
    var unselectAll = ra_core_1.useUnselectAll();
    var refresh = ra_core_1.useRefresh();
    var translate = ra_core_1.useTranslate();
    var _c = ra_core_1.useDeleteMany(resource, selectedIds, {
        action: ra_core_1.CRUD_DELETE_MANY,
        onSuccess: function () {
            refresh();
            notify('ra.notification.deleted', 'info', {
                smart_count: selectedIds.length,
            });
            unselectAll(resource);
        },
        onFailure: function (error) {
            notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
            setOpen(false);
        },
    }), deleteMany = _c[0], loading = _c[1].loading;
    var handleClick = function (e) {
        setOpen(true);
        e.stopPropagation();
    };
    var handleDialogClose = function () {
        setOpen(false);
    };
    var handleDelete = function () {
        deleteMany();
        if (typeof onClick === 'function') {
            onClick();
        }
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Button_1.default, __assign({ onClick: handleClick, label: label, className: classes.deleteButton }, sanitizeRestProps(rest)), icon),
        react_1.default.createElement(Confirm_1.default, { isOpen: isOpen, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                smart_count: selectedIds.length,
                name: inflection_1.default.humanize(translate("resources." + resource + ".name", {
                    smart_count: selectedIds.length,
                    _: inflection_1.default.inflect(resource, selectedIds.length),
                }), true),
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
};
BulkDeleteWithConfirmButton.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    confirmTitle: prop_types_1.default.string,
    confirmContent: prop_types_1.default.string,
    label: prop_types_1.default.string,
    resource: prop_types_1.default.string.isRequired,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    icon: prop_types_1.default.element,
};
BulkDeleteWithConfirmButton.defaultProps = {
    confirmTitle: 'ra.message.bulk_delete_title',
    confirmContent: 'ra.message.bulk_delete_content',
    label: 'ra.action.delete',
    icon: react_1.default.createElement(Delete_1.default, null),
};
exports.default = BulkDeleteWithConfirmButton;
