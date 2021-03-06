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
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import DownloadIcon from '@material-ui/icons/GetApp';
import { fetchRelatedRecords, useDataProvider, useNotify, ExporterContext, } from 'ra-core';
import Button from './Button';
var BulkExportButton = function (_a) {
    var resource = _a.resource, selectedIds = _a.selectedIds, onClick = _a.onClick, _b = _a.label, label = _b === void 0 ? 'ra.action.export' : _b, _c = _a.icon, icon = _c === void 0 ? defaultIcon : _c, rest = __rest(_a, ["resource", "selectedIds", "onClick", "label", "icon"]);
    var exporter = useContext(ExporterContext);
    var dataProvider = useDataProvider();
    var notify = useNotify();
    var handleClick = useCallback(function (event) {
        exporter &&
            dataProvider
                .getMany(resource, { ids: selectedIds })
                .then(function (_a) {
                var data = _a.data;
                return exporter(data, fetchRelatedRecords(dataProvider), dataProvider, resource);
            })
                .catch(function (error) {
                console.error(error);
                notify('ra.notification.http_error', 'warning');
            });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [dataProvider, exporter, notify, onClick, resource, selectedIds]);
    return (React.createElement(Button, __assign({ onClick: handleClick, label: label }, sanitizeRestProps(rest)), icon));
};
var defaultIcon = React.createElement(DownloadIcon, null);
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, filterValues = _a.filterValues, rest = __rest(_a, ["basePath", "filterValues"]);
    return rest;
};
BulkExportButton.propTypes = {
    basePath: PropTypes.string,
    exporter: PropTypes.func,
    label: PropTypes.string,
    resource: PropTypes.string.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    icon: PropTypes.element,
};
export default BulkExportButton;
