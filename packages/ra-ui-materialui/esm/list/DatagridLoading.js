import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import Placeholder from './Placeholder';
import { useTimeout } from 'ra-core';
var times = function (nbChildren, fn) {
    return Array.from({ length: nbChildren }, function (_, key) { return fn(key); });
};
var DatagridLoading = function (_a) {
    var classes = _a.classes, className = _a.className, expand = _a.expand, hasBulkActions = _a.hasBulkActions, nbChildren = _a.nbChildren, _b = _a.nbFakeLines, nbFakeLines = _b === void 0 ? 5 : _b, size = _a.size;
    var oneSecondHasPassed = useTimeout(1000);
    return oneSecondHasPassed ? (React.createElement(Table, { className: classnames(classes.table, className), size: size },
        React.createElement(TableHead, null,
            React.createElement(TableRow, { className: classes.row },
                expand && (React.createElement(TableCell, { padding: "none", className: classes.expandHeader })),
                hasBulkActions && (React.createElement(TableCell, { padding: "checkbox", className: classes.expandIconCell },
                    React.createElement(Checkbox, { className: "select-all", color: "primary", checked: false }))),
                times(nbChildren, function (key) { return (React.createElement(TableCell, { variant: "head", className: classes.headerCell, key: key },
                    React.createElement(Placeholder, null))); }))),
        React.createElement(TableBody, null, times(nbFakeLines, function (key1) { return (React.createElement(TableRow, { key: key1, style: { opacity: 1 / (key1 + 1) } },
            expand && (React.createElement(TableCell, { padding: "none", className: classes.expandIconCell },
                React.createElement(IconButton, { className: classes.expandIcon, component: "div", "aria-hidden": "true" },
                    React.createElement(ExpandMoreIcon, null)))),
            hasBulkActions && (React.createElement(TableCell, { padding: "checkbox", className: classes.expandIconCell },
                React.createElement(Checkbox, { className: "select-all", color: "primary", checked: false }))),
            times(nbChildren, function (key2) { return (React.createElement(TableCell, { className: classes.rowCell, key: key2 },
                React.createElement(Placeholder, null))); }))); })))) : null;
};
DatagridLoading.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool,
    nbChildren: PropTypes.number,
    nbFakeLines: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium']),
};
export default memo(DatagridLoading);
