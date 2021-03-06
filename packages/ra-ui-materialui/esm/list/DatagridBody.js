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
import React, { cloneElement, memo } from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import DatagridRow, { PureDatagridRow } from './DatagridRow';
var DatagridBody = function (_a) {
    var basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, data = _a.data, expand = _a.expand, hasBulkActions = _a.hasBulkActions, hover = _a.hover, ids = _a.ids, onToggleItem = _a.onToggleItem, resource = _a.resource, row = _a.row, rowClick = _a.rowClick, rowStyle = _a.rowStyle, selectedIds = _a.selectedIds, styles = _a.styles, version = _a.version, isRowSelectable = _a.isRowSelectable, rest = __rest(_a, ["basePath", "children", "classes", "className", "data", "expand", "hasBulkActions", "hover", "ids", "onToggleItem", "resource", "row", "rowClick", "rowStyle", "selectedIds", "styles", "version", "isRowSelectable"]);
    return (React.createElement(TableBody, __assign({ className: classnames('datagrid-body', className) }, rest), ids.map(function (id, rowIndex) {
        var _a;
        return cloneElement(row, {
            basePath: basePath,
            classes: classes,
            className: classnames(classes.row, (_a = {},
                _a[classes.rowEven] = rowIndex % 2 === 0,
                _a[classes.rowOdd] = rowIndex % 2 !== 0,
                _a[classes.clickableRow] = rowClick,
                _a)),
            expand: expand,
            hasBulkActions: hasBulkActions,
            hover: hover,
            id: id,
            key: id,
            onToggleItem: onToggleItem,
            record: data[id],
            resource: resource,
            rowClick: rowClick,
            selectable: !isRowSelectable || isRowSelectable(data[id]),
            selected: selectedIds.includes(id),
            style: rowStyle ? rowStyle(data[id], rowIndex) : null,
        }, children);
    })));
};
DatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    row: PropTypes.element,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    styles: PropTypes.object,
    isRowSelectable: PropTypes.func,
    version: PropTypes.number,
};
DatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    row: React.createElement(DatagridRow, null),
};
// trick material-ui Table into thinking this is one of the child type it supports
DatagridBody.muiName = 'TableBody';
var areEqual = function (prevProps, nextProps) {
    var _ = prevProps.children, prevPropsWithoutChildren = __rest(prevProps, ["children"]);
    var __ = nextProps.children, nextPropsWithoutChildren = __rest(nextProps, ["children"]);
    return isEqual(prevPropsWithoutChildren, nextPropsWithoutChildren);
};
export var PureDatagridBody = memo(DatagridBody, areEqual);
// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';
PureDatagridBody.defaultProps = {
    row: React.createElement(PureDatagridRow, null),
};
export default DatagridBody;
