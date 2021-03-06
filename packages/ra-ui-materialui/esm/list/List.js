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
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useCheckMinimumRequiredProps, useListController, getListControllerProps, ComponentPropType, ExporterContext, defaultExporter, } from 'ra-core';
import Title, { TitlePropType } from '../layout/Title';
import ListToolbar from './ListToolbar';
import DefaultPagination from './Pagination';
import BulkDeleteButton from '../button/BulkDeleteButton';
import BulkActionsToolbar from './BulkActionsToolbar';
import DefaultActions from './ListActions';
import Empty from './Empty';
/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * The <List> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - filter (the permanent filter to apply to the query)
 * - filters (a React component used to display the filter form)
 * - pagination
 * - perPage
 * - sort
 * - title
 *
 * @example
 *
 * const PostFilter = (props) => (
 *     <Filter {...props}>
 *         <TextInput label="Search" source="q" alwaysOn />
 *         <TextInput label="Title" source="title" />
 *     </Filter>
 * );
 * export const PostList = (props) => (
 *     <List {...props}
 *         title="List of posts"
 *         sort={{ field: 'published_at' }}
 *         filter={{ is_published: true }}
 *         filters={PostFilter}
 *     >
 *         <Datagrid>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 */
var List = function (props) { return React.createElement(ListView, __assign({}, props, useListController(props))); };
List.propTypes = {
    // the props you can change
    actions: PropTypes.element,
    aside: PropTypes.element,
    bulkActionButtons: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    filter: PropTypes.object,
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
    perPage: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    title: TitlePropType,
    // the props managed by react-admin
    authProvider: PropTypes.func,
    hasCreate: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    hasList: PropTypes.bool.isRequired,
    hasShow: PropTypes.bool.isRequired,
    location: PropTypes.object,
    match: PropTypes.object,
    path: PropTypes.string,
    resource: PropTypes.string.isRequired,
};
List.defaultProps = {
    filter: {},
    perPage: 10,
};
export var ListView = function (props) {
    var actions = props.actions, aside = props.aside, filter = props.filter, filters = props.filters, bulkActionButtons = props.bulkActionButtons, pagination = props.pagination, children = props.children, className = props.className, classesOverride = props.classes, Content = props.component, _a = props.exporter, exporter = _a === void 0 ? defaultExporter : _a, title = props.title, empty = props.empty, rest = __rest(props, ["actions", "aside", "filter", "filters", "bulkActionButtons", "pagination", "children", "className", "classes", "component", "exporter", "title", "empty"]);
    useCheckMinimumRequiredProps('List', ['children'], props);
    var classes = useStyles({ classes: classesOverride });
    var defaultTitle = rest.defaultTitle, version = rest.version, total = rest.total, loaded = rest.loaded, loading = rest.loading, hasCreate = rest.hasCreate, filterValues = rest.filterValues;
    var controllerProps = getListControllerProps(rest);
    var renderList = function () {
        var _a;
        return (React.createElement(React.Fragment, null,
            (filters || actions) && (React.createElement(ListToolbar, __assign({ filters: filters }, controllerProps, { actions: actions, exporter: exporter, permanentFilter: filter }))),
            React.createElement("div", { className: classes.main },
                React.createElement(Content, { className: classnames(classes.content, (_a = {},
                        _a[classes.bulkActionsDisplayed] = controllerProps.selectedIds.length > 0,
                        _a)), key: version },
                    bulkActionButtons !== false && bulkActionButtons && (React.createElement(BulkActionsToolbar, __assign({}, controllerProps), bulkActionButtons)),
                    children &&
                        cloneElement(Children.only(children), __assign(__assign({}, controllerProps), { hasBulkActions: bulkActionButtons !== false })),
                    pagination && cloneElement(pagination, controllerProps)),
                aside && cloneElement(aside, controllerProps))));
    };
    var shouldRenderEmptyPage = hasCreate &&
        loaded &&
        !loading &&
        !total &&
        !Object.keys(filterValues).length;
    return (React.createElement(ExporterContext.Provider, { value: exporter },
        React.createElement("div", __assign({ className: classnames('list-page', classes.root, className) }, sanitizeRestProps(rest)),
            React.createElement(Title, { title: title, defaultTitle: defaultTitle }),
            shouldRenderEmptyPage
                ? cloneElement(empty, controllerProps)
                : renderList())));
};
ListView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    basePath: PropTypes.string,
    bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    component: ComponentPropType,
    currentSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    data: PropTypes.object,
    defaultTitle: PropTypes.string,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    hideFilter: PropTypes.func,
    ids: PropTypes.array,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    onUnselectItems: PropTypes.func,
    page: PropTypes.number,
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    perPage: PropTypes.number,
    refresh: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    setFilters: PropTypes.func,
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    setSort: PropTypes.func,
    showFilter: PropTypes.func,
    title: TitlePropType,
    total: PropTypes.number,
    version: PropTypes.number,
};
var DefaultBulkActionButtons = function (props) { return React.createElement(BulkDeleteButton, __assign({}, props)); };
ListView.defaultProps = {
    actions: React.createElement(DefaultActions, null),
    classes: {},
    component: Card,
    bulkActionButtons: React.createElement(DefaultBulkActionButtons, null),
    pagination: React.createElement(DefaultPagination, null),
    empty: React.createElement(Empty, null),
};
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: {},
        main: {
            display: 'flex',
        },
        content: (_a = {
                marginTop: 0,
                transition: theme.transitions.create('margin-top'),
                position: 'relative',
                flex: '1 1 auto'
            },
            _a[theme.breakpoints.down('xs')] = {
                boxShadow: 'none',
            },
            _a.overflow = 'inherit',
            _a),
        bulkActionsDisplayed: {
            marginTop: -theme.spacing(8),
            transition: theme.transitions.create('margin-top'),
        },
        actions: {
            zIndex: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
        },
        noResults: { padding: 20 },
    });
}, { name: 'RaList' });
var sanitizeRestProps = function (_a) {
    var actions = _a.actions, basePath = _a.basePath, changeListParams = _a.changeListParams, children = _a.children, classes = _a.classes, className = _a.className, crudGetList = _a.crudGetList, currentSort = _a.currentSort, data = _a.data, defaultTitle = _a.defaultTitle, displayedFilters = _a.displayedFilters, exporter = _a.exporter, filter = _a.filter, filterDefaultValues = _a.filterDefaultValues, filters = _a.filters, filterValues = _a.filterValues, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, hideFilter = _a.hideFilter, history = _a.history, ids = _a.ids, loading = _a.loading, loaded = _a.loaded, locale = _a.locale, location = _a.location, match = _a.match, onSelect = _a.onSelect, onToggleItem = _a.onToggleItem, onUnselectItems = _a.onUnselectItems, options = _a.options, page = _a.page, pagination = _a.pagination, params = _a.params, permissions = _a.permissions, perPage = _a.perPage, push = _a.push, query = _a.query, refresh = _a.refresh, resource = _a.resource, selectedIds = _a.selectedIds, setFilters = _a.setFilters, setPage = _a.setPage, setPerPage = _a.setPerPage, setSelectedIds = _a.setSelectedIds, setSort = _a.setSort, showFilter = _a.showFilter, sort = _a.sort, title = _a.title, toggleItem = _a.toggleItem, total = _a.total, version = _a.version, empty = _a.empty, rest = __rest(_a, ["actions", "basePath", "changeListParams", "children", "classes", "className", "crudGetList", "currentSort", "data", "defaultTitle", "displayedFilters", "exporter", "filter", "filterDefaultValues", "filters", "filterValues", "hasCreate", "hasEdit", "hasList", "hasShow", "hideFilter", "history", "ids", "loading", "loaded", "locale", "location", "match", "onSelect", "onToggleItem", "onUnselectItems", "options", "page", "pagination", "params", "permissions", "perPage", "push", "query", "refresh", "resource", "selectedIds", "setFilters", "setPage", "setPerPage", "setSelectedIds", "setSort", "showFilter", "sort", "title", "toggleItem", "total", "version", "empty"]);
    return rest;
};
export default List;
