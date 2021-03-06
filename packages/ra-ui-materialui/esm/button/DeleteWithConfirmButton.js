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
import React, { Fragment, useState, useCallback, } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import inflection from 'inflection';
import { useTranslate, useDelete, useRefresh, useNotify, useRedirect, CRUD_DELETE, } from 'ra-core';
import Confirm from '../layout/Confirm';
import Button from './Button';
var DeleteWithConfirmButton = function (_a) {
    var basePath = _a.basePath, classesOverride = _a.classes, className = _a.className, _b = _a.confirmTitle, confirmTitle = _b === void 0 ? 'ra.message.delete_title' : _b, _c = _a.confirmContent, confirmContent = _c === void 0 ? 'ra.message.delete_content' : _c, _d = _a.icon, icon = _d === void 0 ? defaultIcon : _d, _e = _a.label, label = _e === void 0 ? 'ra.action.delete' : _e, onClick = _a.onClick, record = _a.record, resource = _a.resource, _f = _a.redirect, redirectTo = _f === void 0 ? 'list' : _f, rest = __rest(_a, ["basePath", "classes", "className", "confirmTitle", "confirmContent", "icon", "label", "onClick", "record", "resource", "redirect"]);
    var _g = useState(false), open = _g[0], setOpen = _g[1];
    var translate = useTranslate();
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var classes = useStyles({ classes: classesOverride });
    var _h = useDelete(resource, record && record.id, record, {
        action: CRUD_DELETE,
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
    var handleDelete = useCallback(function (event) {
        deleteOne();
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteOne, onClick]);
    return (React.createElement(Fragment, null,
        React.createElement(Button, __assign({ onClick: handleClick, label: label, className: classnames('ra-delete-button', classes.deleteButton, className), key: "button" }, sanitizeRestProps(rest)), icon),
        React.createElement(Confirm, { isOpen: open, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                name: inflection.humanize(translate("resources." + resource + ".name", {
                    smart_count: 1,
                    _: inflection.singularize(resource),
                }), true),
                id: record.id,
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
};
var defaultIcon = React.createElement(ActionDelete, null);
var sanitizeRestProps = function (_a) {
    var handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, label = _a.label, pristine = _a.pristine, saving = _a.saving, submitOnEnter = _a.submitOnEnter, undoable = _a.undoable, rest = __rest(_a, ["handleSubmit", "handleSubmitWithRedirect", "invalid", "label", "pristine", "saving", "submitOnEnter", "undoable"]);
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
}); }, { name: 'RaDeleteWithConfirmButton' });
DeleteWithConfirmButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    icon: PropTypes.element,
};
export default DeleteWithConfirmButton;
