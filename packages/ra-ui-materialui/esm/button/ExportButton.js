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
var ExportButton = function (_a) {
    var sort = _a.sort, _b = _a.filter, filter = _b === void 0 ? defaultFilter : _b, _c = _a.maxResults, maxResults = _c === void 0 ? 1000 : _c, resource = _a.resource, onClick = _a.onClick, _d = _a.label, label = _d === void 0 ? 'ra.action.export' : _d, _e = _a.icon, icon = _e === void 0 ? defaultIcon : _e, rest = __rest(_a, ["sort", "filter", "maxResults", "resource", "onClick", "label", "icon"]);
    var exporter = useContext(ExporterContext);
    var dataProvider = useDataProvider();
    var notify = useNotify();
    var handleClick = useCallback(function (event) {
        dataProvider
            .getList(resource, {
            sort: sort,
            filter: filter,
            pagination: { page: 1, perPage: maxResults },
        })
            .then(function (_a) {
            var data = _a.data;
            return exporter &&
                exporter(data, fetchRelatedRecords(dataProvider), dataProvider, resource);
        })
            .catch(function (error) {
            console.error(error);
            notify('ra.notification.http_error', 'warning');
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [
        dataProvider,
        exporter,
        filter,
        maxResults,
        notify,
        onClick,
        resource,
        sort,
    ]);
    return (React.createElement(Button, __assign({ onClick: handleClick, label: label }, sanitizeRestProps(rest)), icon));
};
var defaultIcon = React.createElement(DownloadIcon, null);
var defaultFilter = {};
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, exporter = _a.exporter, rest = __rest(_a, ["basePath", "exporter"]);
    return rest;
};
ExportButton.propTypes = {
    basePath: PropTypes.string,
    exporter: PropTypes.func,
    filter: PropTypes.object,
    label: PropTypes.string,
    maxResults: PropTypes.number,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.exact({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    icon: PropTypes.element,
};
export default ExportButton;
