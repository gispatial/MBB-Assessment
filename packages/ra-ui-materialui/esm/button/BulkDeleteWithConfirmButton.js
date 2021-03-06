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
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import ActionDelete from '@material-ui/icons/Delete';
import { fade } from '@material-ui/core/styles/colorManipulator';
import inflection from 'inflection';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, useDeleteMany, useRefresh, useNotify, useUnselectAll, CRUD_DELETE_MANY, } from 'ra-core';
import Confirm from '../layout/Confirm';
import Button from './Button';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, crudDeleteMany = _a.crudDeleteMany, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, rest = __rest(_a, ["basePath", "classes", "crudDeleteMany", "filterValues", "label", "resource", "selectedIds"]);
    return rest;
};
var useStyles = makeStyles(function (theme) { return ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
}); }, { name: 'RaBulkDeleteWithConfirmButton' });
var BulkDeleteWithConfirmButton = function (_a) {
    var basePath = _a.basePath, classesOverride = _a.classes, confirmTitle = _a.confirmTitle, confirmContent = _a.confirmContent, crudDeleteMany = _a.crudDeleteMany, icon = _a.icon, label = _a.label, onClick = _a.onClick, resource = _a.resource, selectedIds = _a.selectedIds, rest = __rest(_a, ["basePath", "classes", "confirmTitle", "confirmContent", "crudDeleteMany", "icon", "label", "onClick", "resource", "selectedIds"]);
    var _b = useState(false), isOpen = _b[0], setOpen = _b[1];
    var classes = useStyles({ classes: classesOverride });
    var notify = useNotify();
    var unselectAll = useUnselectAll();
    var refresh = useRefresh();
    var translate = useTranslate();
    var _c = useDeleteMany(resource, selectedIds, {
        action: CRUD_DELETE_MANY,
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
    return (React.createElement(Fragment, null,
        React.createElement(Button, __assign({ onClick: handleClick, label: label, className: classes.deleteButton }, sanitizeRestProps(rest)), icon),
        React.createElement(Confirm, { isOpen: isOpen, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                smart_count: selectedIds.length,
                name: inflection.humanize(translate("resources." + resource + ".name", {
                    smart_count: selectedIds.length,
                    _: inflection.inflect(resource, selectedIds.length),
                }), true),
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
};
BulkDeleteWithConfirmButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    resource: PropTypes.string.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    icon: PropTypes.element,
};
BulkDeleteWithConfirmButton.defaultProps = {
    confirmTitle: 'ra.message.bulk_delete_title',
    confirmContent: 'ra.message.bulk_delete_content',
    label: 'ra.action.delete',
    icon: React.createElement(ActionDelete, null),
};
export default BulkDeleteWithConfirmButton;
