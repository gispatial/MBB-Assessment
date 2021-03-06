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
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var Title_1 = __importStar(require("../layout/Title"));
var ListToolbar_1 = __importDefault(require("./ListToolbar"));
var Pagination_1 = __importDefault(require("./Pagination"));
var BulkDeleteButton_1 = __importDefault(require("../button/BulkDeleteButton"));
var BulkActionsToolbar_1 = __importDefault(require("./BulkActionsToolbar"));
var ListActions_1 = __importDefault(require("./ListActions"));
var Empty_1 = __importDefault(require("./Empty"));
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
var List = function (props) { return react_1.default.createElement(exports.ListView, __assign({}, props, ra_core_1.useListController(props))); };
List.propTypes = {
    // the props you can change
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    bulkActionButtons: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.bool]),
    children: prop_types_1.default.node,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    filter: prop_types_1.default.object,
    filterDefaultValues: prop_types_1.default.object,
    filters: prop_types_1.default.element,
    pagination: prop_types_1.default.element,
    perPage: prop_types_1.default.number.isRequired,
    sort: prop_types_1.default.shape({
        field: prop_types_1.default.string,
        order: prop_types_1.default.string,
    }),
    title: Title_1.TitlePropType,
    // the props managed by react-admin
    authProvider: prop_types_1.default.func,
    hasCreate: prop_types_1.default.bool.isRequired,
    hasEdit: prop_types_1.default.bool.isRequired,
    hasList: prop_types_1.default.bool.isRequired,
    hasShow: prop_types_1.default.bool.isRequired,
    location: prop_types_1.default.object,
    match: prop_types_1.default.object,
    path: prop_types_1.default.string,
    resource: prop_types_1.default.string.isRequired,
};
List.defaultProps = {
    filter: {},
    perPage: 10,
};
exports.ListView = function (props) {
    var actions = props.actions, aside = props.aside, filter = props.filter, filters = props.filters, bulkActionButtons = props.bulkActionButtons, pagination = props.pagination, children = props.children, className = props.className, classesOverride = props.classes, Content = props.component, _a = props.exporter, exporter = _a === void 0 ? ra_core_1.defaultExporter : _a, title = props.title, empty = props.empty, rest = __rest(props, ["actions", "aside", "filter", "filters", "bulkActionButtons", "pagination", "children", "className", "classes", "component", "exporter", "title", "empty"]);
    ra_core_1.useCheckMinimumRequiredProps('List', ['children'], props);
    var classes = useStyles({ classes: classesOverride });
    var defaultTitle = rest.defaultTitle, version = rest.version, total = rest.total, loaded = rest.loaded, loading = rest.loading, hasCreate = rest.hasCreate, filterValues = rest.filterValues;
    var controllerProps = ra_core_1.getListControllerProps(rest);
    var renderList = function () {
        var _a;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            (filters || actions) && (react_1.default.createElement(ListToolbar_1.default, __assign({ filters: filters }, controllerProps, { actions: actions, exporter: exporter, permanentFilter: filter }))),
            react_1.default.createElement("div", { className: classes.main },
                react_1.default.createElement(Content, { className: classnames_1.default(classes.content, (_a = {},
                        _a[classes.bulkActionsDisplayed] = controllerProps.selectedIds.length > 0,
                        _a)), key: version },
                    bulkActionButtons !== false && bulkActionButtons && (react_1.default.createElement(BulkActionsToolbar_1.default, __assign({}, controllerProps), bulkActionButtons)),
                    children &&
                        react_1.cloneElement(react_1.Children.only(children), __assign(__assign({}, controllerProps), { hasBulkActions: bulkActionButtons !== false })),
                    pagination && react_1.cloneElement(pagination, controllerProps)),
                aside && react_1.cloneElement(aside, controllerProps))));
    };
    var shouldRenderEmptyPage = hasCreate &&
        loaded &&
        !loading &&
        !total &&
        !Object.keys(filterValues).length;
    return (react_1.default.createElement(ra_core_1.ExporterContext.Provider, { value: exporter },
        react_1.default.createElement("div", __assign({ className: classnames_1.default('list-page', classes.root, className) }, sanitizeRestProps(rest)),
            react_1.default.createElement(Title_1.default, { title: title, defaultTitle: defaultTitle }),
            shouldRenderEmptyPage
                ? react_1.cloneElement(empty, controllerProps)
                : renderList())));
};
exports.ListView.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    basePath: prop_types_1.default.string,
    bulkActionButtons: prop_types_1.default.oneOfType([prop_types_1.default.bool, prop_types_1.default.element]),
    children: prop_types_1.default.element,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    component: ra_core_1.ComponentPropType,
    currentSort: prop_types_1.default.shape({
        field: prop_types_1.default.string,
        order: prop_types_1.default.string,
    }),
    data: prop_types_1.default.object,
    defaultTitle: prop_types_1.default.string,
    displayedFilters: prop_types_1.default.object,
    exporter: prop_types_1.default.oneOfType([prop_types_1.default.func, prop_types_1.default.bool]),
    filterDefaultValues: prop_types_1.default.object,
    filters: prop_types_1.default.element,
    filterValues: prop_types_1.default.object,
    hasCreate: prop_types_1.default.bool,
    hideFilter: prop_types_1.default.func,
    ids: prop_types_1.default.array,
    loading: prop_types_1.default.bool,
    onSelect: prop_types_1.default.func,
    onToggleItem: prop_types_1.default.func,
    onUnselectItems: prop_types_1.default.func,
    page: prop_types_1.default.number,
    pagination: prop_types_1.default.oneOfType([prop_types_1.default.bool, prop_types_1.default.element]),
    perPage: prop_types_1.default.number,
    refresh: prop_types_1.default.func,
    resource: prop_types_1.default.string,
    selectedIds: prop_types_1.default.array,
    setFilters: prop_types_1.default.func,
    setPage: prop_types_1.default.func,
    setPerPage: prop_types_1.default.func,
    setSort: prop_types_1.default.func,
    showFilter: prop_types_1.default.func,
    title: Title_1.TitlePropType,
    total: prop_types_1.default.number,
    version: prop_types_1.default.number,
};
var DefaultBulkActionButtons = function (props) { return react_1.default.createElement(BulkDeleteButton_1.default, __assign({}, props)); };
exports.ListView.defaultProps = {
    actions: react_1.default.createElement(ListActions_1.default, null),
    classes: {},
    component: Card_1.default,
    bulkActionButtons: react_1.default.createElement(DefaultBulkActionButtons, null),
    pagination: react_1.default.createElement(Pagination_1.default, null),
    empty: react_1.default.createElement(Empty_1.default, null),
};
var useStyles = styles_1.makeStyles(function (theme) {
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
exports.default = List;
