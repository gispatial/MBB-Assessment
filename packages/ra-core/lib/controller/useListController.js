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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var inflection_1 = __importDefault(require("inflection"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var checkMinimumRequiredProps_1 = require("./checkMinimumRequiredProps");
var useListParams_1 = __importDefault(require("./useListParams"));
var useRecordSelection_1 = __importDefault(require("./useRecordSelection"));
var useVersion_1 = __importDefault(require("./useVersion"));
var i18n_1 = require("../i18n");
var queryReducer_1 = require("../reducer/admin/resource/list/queryReducer");
var actions_1 = require("../actions");
var sideEffect_1 = require("../sideEffect");
var useQueryWithStore_1 = __importDefault(require("../dataProvider/useQueryWithStore"));
var defaultSort = {
    field: 'id',
    order: queryReducer_1.SORT_ASC,
};
var defaultData = {};
/**
 * Prepare data for the List view
 *
 * @param {Object} props The props passed to the List component.
 *
 * @return {Object} controllerProps Fetched and computed data for the List view
 *
 * @example
 *
 * import { useListController } from 'react-admin';
 * import ListView from './ListView';
 *
 * const MyList = props => {
 *     const controllerProps = useListController(props);
 *     return <ListView {...controllerProps} {...props} />;
 * }
 */
var useListController = function (props) {
    checkMinimumRequiredProps_1.useCheckMinimumRequiredProps('List', ['basePath', 'resource'], props);
    var basePath = props.basePath, resource = props.resource, hasCreate = props.hasCreate, filterDefaultValues = props.filterDefaultValues, _a = props.sort, sort = _a === void 0 ? defaultSort : _a, _b = props.perPage, perPage = _b === void 0 ? 10 : _b, filter = props.filter, _c = props.debounce, debounce = _c === void 0 ? 500 : _c;
    if (filter && react_1.isValidElement(filter)) {
        throw new Error('<List> received a React element as `filter` props. If you intended to set the list filter elements, use the `filters` (with an s) prop instead. The `filter` prop is internal and should not be set by the developer.');
    }
    var location = react_router_dom_1.useLocation();
    var translate = i18n_1.useTranslate();
    var notify = sideEffect_1.useNotify();
    var version = useVersion_1.default();
    var _d = useListParams_1.default({
        resource: resource,
        location: location,
        filterDefaultValues: filterDefaultValues,
        sort: sort,
        perPage: perPage,
        debounce: debounce,
    }), query = _d[0], queryModifiers = _d[1];
    var _e = useRecordSelection_1.default(resource), selectedIds = _e[0], selectionModifiers = _e[1];
    /**
     * We don't use useGetList() here because we want the list of ids to be
     * always available for optimistic rendering, and therefore we need a
     * custom action (CRUD_GET_LIST), a custom reducer for ids and total
     * (admin.resources.[resource].list.ids and admin.resources.[resource].list.total)
     * and a custom selector for these reducers.
     * Also we don't want that calls to useGetList() in userland change
     * the list of ids in the main List view.
     */
    var _f = useQueryWithStore_1.default({
        type: 'getList',
        resource: resource,
        payload: {
            pagination: {
                page: query.page,
                perPage: query.perPage,
            },
            sort: { field: query.sort, order: query.order },
            filter: __assign(__assign({}, query.filter), filter),
        },
    }, {
        action: actions_1.CRUD_GET_LIST,
        version: version,
        onFailure: function (error) {
            return notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
        },
    }, function (state) {
        return state.admin.resources[resource]
            ? state.admin.resources[resource].list.ids
            : null;
    }, function (state) {
        return state.admin.resources[resource]
            ? state.admin.resources[resource].list.total
            : null;
    }), ids = _f.data, total = _f.total, loading = _f.loading, loaded = _f.loaded;
    var data = react_redux_1.useSelector(function (state) {
        return state.admin.resources[resource]
            ? state.admin.resources[resource].data
            : defaultData;
    }, react_redux_1.shallowEqual);
    react_1.useEffect(function () {
        if (query.page <= 0 ||
            (!loading && query.page > 1 && (ids || []).length === 0)) {
            // query for a page that doesn't exist, set page to 1
            queryModifiers.setPage(1);
        }
    }, [loading, query.page, ids, queryModifiers]);
    var currentSort = react_1.useMemo(function () { return ({
        field: query.sort,
        order: query.order,
    }); }, [query.sort, query.order]);
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 2,
        _: inflection_1.default.humanize(inflection_1.default.pluralize(resource)),
    });
    var defaultTitle = translate('ra.page.list', {
        name: resourceName,
    });
    return {
        basePath: basePath,
        currentSort: currentSort,
        data: data,
        defaultTitle: defaultTitle,
        displayedFilters: query.displayedFilters,
        filterValues: query.filterValues,
        hasCreate: hasCreate,
        // ids might be null if the resource has not been initialized yet (custom routes for example)
        ids: ids || [],
        loading: loading,
        loaded: loaded,
        onSelect: selectionModifiers.select,
        onToggleItem: selectionModifiers.toggle,
        onUnselectItems: selectionModifiers.clearSelection,
        page: query.page,
        perPage: query.perPage,
        resource: resource,
        selectedIds: selectedIds,
        setFilters: queryModifiers.setFilters,
        hideFilter: queryModifiers.hideFilter,
        showFilter: queryModifiers.showFilter,
        setPage: queryModifiers.setPage,
        setPerPage: queryModifiers.setPerPage,
        setSort: queryModifiers.setSort,
        // total might be null if the resource has not been initialized yet (custom routes for example)
        total: total != undefined ? total : 0,
        version: version,
    };
};
exports.injectedProps = [
    'basePath',
    'currentSort',
    'data',
    'defaultTitle',
    'displayedFilters',
    'filterValues',
    'hasCreate',
    'hideFilter',
    'ids',
    'loading',
    'loaded',
    'onSelect',
    'onToggleItem',
    'onUnselectItems',
    'page',
    'perPage',
    'refresh',
    'resource',
    'selectedIds',
    'setFilters',
    'setPage',
    'setPerPage',
    'setSort',
    'showFilter',
    'total',
    'version',
];
/**
 * Select the props injected by the useListController hook
 * to be passed to the List children need
 * This is an implementation of pick()
 */
exports.getListControllerProps = function (props) {
    return exports.injectedProps.reduce(function (acc, key) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[key] = props[key], _a)));
    }, {});
};
/**
 * Select the props not injected by the useListController hook
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
exports.sanitizeListRestProps = function (props) {
    return Object.keys(props)
        .filter(function (propName) { return !exports.injectedProps.includes(propName); })
        .reduce(function (acc, key) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[key] = props[key], _a)));
    }, {});
};
exports.default = useListController;
