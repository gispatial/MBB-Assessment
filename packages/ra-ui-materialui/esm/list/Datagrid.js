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
import React, { isValidElement, Children, cloneElement, useCallback, } from 'react';
import PropTypes from 'prop-types';
import { sanitizeListRestProps } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import DatagridHeaderCell from './DatagridHeaderCell';
import DatagridLoading from './DatagridLoading';
import DatagridBody, { PureDatagridBody } from './DatagridBody';
var useStyles = makeStyles(function (theme) { return ({
    table: {
        tableLayout: 'auto',
    },
    thead: {},
    tbody: {},
    headerRow: {},
    headerCell: {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
    },
    checkbox: {},
    row: {},
    clickableRow: {
        cursor: 'pointer',
    },
    rowEven: {},
    rowOdd: {},
    rowCell: {},
    expandHeader: {
        padding: 0,
        width: theme.spacing(6),
    },
    expandIconCell: {
        width: theme.spacing(6),
    },
    expandIcon: {
        padding: theme.spacing(1),
        transform: 'rotate(-90deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expanded: {
        transform: 'rotate(0deg)',
    },
}); }, { name: 'RaDatagrid' });
/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - rowStyle
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */
function Datagrid(_a) {
    var classesOverride = _a.classes, props = __rest(_a, ["classes"]);
    var classes = useStyles({ classes: classesOverride });
    var basePath = props.basePath, _b = props.optimized, optimized = _b === void 0 ? false : _b, _c = props.body, body = _c === void 0 ? optimized ? React.createElement(PureDatagridBody, null) : React.createElement(DatagridBody, null) : _c, children = props.children, className = props.className, currentSort = props.currentSort, data = props.data, expand = props.expand, hasBulkActions = props.hasBulkActions, hover = props.hover, ids = props.ids, loading = props.loading, loaded = props.loaded, onSelect = props.onSelect, onToggleItem = props.onToggleItem, resource = props.resource, rowClick = props.rowClick, rowStyle = props.rowStyle, selectedIds = props.selectedIds, setSort = props.setSort, _d = props.size, size = _d === void 0 ? 'small' : _d, total = props.total, isRowSelectable = props.isRowSelectable, version = props.version, rest = __rest(props, ["basePath", "optimized", "body", "children", "className", "currentSort", "data", "expand", "hasBulkActions", "hover", "ids", "loading", "loaded", "onSelect", "onToggleItem", "resource", "rowClick", "rowStyle", "selectedIds", "setSort", "size", "total", "isRowSelectable", "version"]);
    var updateSort = useCallback(function (event) {
        event.stopPropagation();
        setSort(event.currentTarget.dataset.sort);
    }, [setSort]);
    var handleSelectAll = useCallback(function (event) {
        if (event.target.checked) {
            var all_1 = ids.concat(selectedIds.filter(function (id) { return !ids.includes(id); }));
            onSelect(isRowSelectable
                ? all_1.filter(function (id) { return isRowSelectable(data[id]); })
                : all_1);
        }
        else {
            onSelect([]);
        }
    }, [data, ids, onSelect, isRowSelectable, selectedIds]);
    /**
     * if loaded is false, the list displays for the first time, and the dataProvider hasn't answered yet
     * if loaded is true, the data for the list has at least been returned once by the dataProvider
     * if loaded is undefined, the Datagrid parent doesn't track loading state (e.g. ReferenceArrayField)
     */
    if (loaded === false) {
        return (React.createElement(DatagridLoading, { classes: classes, className: className, expand: expand, hasBulkActions: hasBulkActions, nbChildren: React.Children.count(children), size: size }));
    }
    /**
     * Once loaded, the data for the list may be empty. Instead of
     * displaying the table header with zero data rows,
     * the datagrid displays nothing in this case.
     */
    if (loaded && (ids.length === 0 || total === 0)) {
        return null;
    }
    var all = isRowSelectable
        ? ids.filter(function (id) { return isRowSelectable(data[id]); })
        : ids;
    /**
     * After the initial load, if the data for the list isn't empty,
     * and even if the data is refreshing (e.g. after a filter change),
     * the datagrid displays the current data.
     */
    return (React.createElement(Table, __assign({ className: classnames(classes.table, className), size: size }, sanitizeListRestProps(rest)),
        React.createElement(TableHead, { className: classes.thead },
            React.createElement(TableRow, { className: classnames(classes.row, classes.headerRow) },
                expand && (React.createElement(TableCell, { padding: "none", className: classnames(classes.headerCell, classes.expandHeader) })),
                hasBulkActions && (React.createElement(TableCell, { padding: "checkbox", className: classes.headerCell },
                    React.createElement(Checkbox, { className: "select-all", color: "primary", checked: selectedIds.length > 0 &&
                            all.length > 0 &&
                            all.every(function (id) { return selectedIds.includes(id); }), onChange: handleSelectAll }))),
                Children.map(children, function (field, index) {
                    return isValidElement(field) ? (React.createElement(DatagridHeaderCell, { className: classes.headerCell, currentSort: currentSort, field: field, isSorting: currentSort.field ===
                            (field.props.sortBy || field.props.source), key: field.props.source || index, resource: resource, updateSort: updateSort })) : null;
                }))),
        cloneElement(body, {
            basePath: basePath,
            className: classes.tbody,
            classes: classes,
            expand: expand,
            rowClick: rowClick,
            data: data,
            hasBulkActions: hasBulkActions,
            hover: hover,
            ids: ids,
            onToggleItem: onToggleItem,
            resource: resource,
            rowStyle: rowStyle,
            selectedIds: selectedIds,
            isRowSelectable: isRowSelectable,
            version: version,
        }, children)));
}
Datagrid.propTypes = {
    basePath: PropTypes.string,
    body: PropTypes.element,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    currentSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    data: PropTypes.object.isRequired,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    setSort: PropTypes.func,
    total: PropTypes.number,
    version: PropTypes.number,
    isRowSelectable: PropTypes.func,
};
Datagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: [],
};
export default Datagrid;
