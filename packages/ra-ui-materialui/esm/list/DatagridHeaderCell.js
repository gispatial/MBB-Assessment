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
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shouldUpdate from 'recompose/shouldUpdate';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { FieldTitle, useTranslate } from 'ra-core';
// remove the sort icons when not active
var useStyles = makeStyles({
    icon: {
        display: 'none',
    },
    active: {
        '& $icon': {
            display: 'inline',
        },
    },
}, { name: 'RaDatagridHeaderCell' });
export var DatagridHeaderCell = function (props) {
    var className = props.className, classesOverride = props.classes, field = props.field, currentSort = props.currentSort, updateSort = props.updateSort, resource = props.resource, isSorting = props.isSorting, rest = __rest(props, ["className", "classes", "field", "currentSort", "updateSort", "resource", "isSorting"]);
    var classes = useStyles(props);
    var translate = useTranslate();
    return (React.createElement(TableCell, __assign({ className: classnames(className, field.props.headerClassName), align: field.props.textAlign, variant: "head" }, rest), field.props.sortable !== false &&
        (field.props.sortBy || field.props.source) ? (React.createElement(Tooltip, { title: translate('ra.action.sort'), placement: field.props.textAlign === 'right'
            ? 'bottom-end'
            : 'bottom-start', enterDelay: 300 },
        React.createElement(TableSortLabel, { active: currentSort.field ===
                (field.props.sortBy || field.props.source), direction: currentSort.order === 'ASC' ? 'asc' : 'desc', "data-sort": field.props.sortBy || field.props.source, onClick: updateSort, classes: classes },
            React.createElement(FieldTitle, { label: field.props.label, source: field.props.source, resource: resource })))) : (React.createElement(FieldTitle, { label: field.props.label, source: field.props.source, resource: resource }))));
};
DatagridHeaderCell.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    field: PropTypes.element,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }).isRequired,
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    updateSort: PropTypes.func.isRequired,
};
export default shouldUpdate(function (props, nextProps) {
    return props.updateSort !== nextProps.updateSort ||
        props.currentSort.sort !== nextProps.currentSort.sort ||
        props.currentSort.order !== nextProps.currentSort.order ||
        (nextProps.isSorting && props.sortable !== nextProps.sortable);
})(DatagridHeaderCell);
