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
import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { parse, stringify } from 'query-string';
import lodashDebounce from 'lodash/debounce';
import set from 'lodash/set';
import pickBy from 'lodash/pickBy';
import queryReducer, { SET_FILTER, SET_PAGE, SET_PER_PAGE, SET_SORT, SORT_ASC, } from '../reducer/admin/resource/list/queryReducer';
import { changeListParams } from '../actions/listActions';
import removeEmpty from '../util/removeEmpty';
import removeKey from '../util/removeKey';
import { useHistory } from 'react-router-dom';
var emptyObject = {};
var defaultSort = {
    field: 'id',
    order: SORT_ASC,
};
var defaultParams = {};
/**
 * Get the list parameters (page, sort, filters) and modifiers.
 *
 * These parameters are merged from 3 sources:
 *   - the query string from the URL
 *   - the params stored in the state (from previous navigation)
 *   - the options passed to the hook (including the filter defaultValues)
 *
 * @returns {Array} A tuple [parameters, modifiers].
 * Destructure as [
 *    { page, perPage, sort, order, filter, filterValues, displayedFilters, requestSignature },
 *    { setFilters, hideFilter, showFilter, setPage, setPerPage, setSort }
 * ]
 *
 * @example
 *
 * const [listParams, listParamsActions] = useListParams({
 *      resource: 'posts',
 *      location: location // From react-router. Injected to your component by react-admin inside a List
 *      filterDefaultValues: {
 *          published: true
 *      },
 *      sort: {
 *          field: 'published_at',
 *          order: 'DESC'
 *      },
 *      perPage: 25
 * });
 *
 * const {
 *      page,
 *      perPage,
 *      sort,
 *      order,
 *      filter,
 *      filterValues,
 *      displayedFilters,
 *      requestSignature
 * } = listParams;
 *
 * const {
 *      setFilters,
 *      hideFilter,
 *      showFilter,
 *      setPage,
 *      setPerPage,
 *      setSort,
 * } = listParamsActions;
 */
var useListParams = function (_a) {
    var resource = _a.resource, location = _a.location, filterDefaultValues = _a.filterDefaultValues, _b = _a.sort, sort = _b === void 0 ? defaultSort : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c, _d = _a.debounce, debounce = _d === void 0 ? 500 : _d;
    var _e = useState({}), displayedFilters = _e[0], setDisplayedFilters = _e[1];
    var dispatch = useDispatch();
    var history = useHistory();
    var params = useSelector(function (reduxState) {
        return reduxState.admin.resources[resource]
            ? reduxState.admin.resources[resource].list.params
            : defaultParams;
    }, shallowEqual);
    var requestSignature = [
        location.search,
        resource,
        params,
        filterDefaultValues,
        JSON.stringify(sort),
        perPage,
    ];
    var query = useMemo(function () {
        return getQuery({
            location: location,
            params: params,
            filterDefaultValues: filterDefaultValues,
            sort: sort,
            perPage: perPage,
        });
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var changeParams = useCallback(function (action) {
        var newParams = queryReducer(query, action);
        history.push({
            search: "?" + stringify(__assign(__assign({}, newParams), { filter: JSON.stringify(newParams.filter) })),
        });
        dispatch(changeListParams(resource, newParams));
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps
    var setSort = useCallback(function (newSort) {
        return changeParams({ type: SET_SORT, payload: { sort: newSort } });
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var setPage = useCallback(function (newPage) { return changeParams({ type: SET_PAGE, payload: newPage }); }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var setPerPage = useCallback(function (newPerPage) {
        return changeParams({ type: SET_PER_PAGE, payload: newPerPage });
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var filterValues = query.filter || emptyObject;
    var debouncedSetFilters = lodashDebounce(function (newFilters) {
        return changeParams({
            type: SET_FILTER,
            payload: removeEmpty(newFilters),
        });
    }, debounce);
    var setFilters = useCallback(function (filters) { return debouncedSetFilters(filters); }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var hideFilter = useCallback(function (filterName) {
        setDisplayedFilters(function (previousFilters) {
            var _a;
            return (__assign(__assign({}, previousFilters), (_a = {}, _a[filterName] = false, _a)));
        });
        var newFilters = removeKey(filterValues, filterName);
        setFilters(newFilters);
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps
    var showFilter = useCallback(function (filterName, defaultValue) {
        setDisplayedFilters(function (previousFilters) {
            var _a;
            return (__assign(__assign({}, previousFilters), (_a = {}, _a[filterName] = true, _a)));
        });
        if (typeof defaultValue !== 'undefined') {
            setFilters(set(filterValues, filterName, defaultValue));
        }
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps
    return [
        __assign({ displayedFilters: displayedFilters,
            filterValues: filterValues,
            requestSignature: requestSignature }, query),
        {
            changeParams: changeParams,
            setPage: setPage,
            setPerPage: setPerPage,
            setSort: setSort,
            setFilters: setFilters,
            hideFilter: hideFilter,
            showFilter: showFilter,
        },
    ];
};
export var validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
export var parseQueryFromLocation = function (_a) {
    var search = _a.search;
    var query = pickBy(parse(search), function (v, k) { return validQueryParams.indexOf(k) !== -1; });
    if (query.filter && typeof query.filter === 'string') {
        try {
            query.filter = JSON.parse(query.filter);
        }
        catch (err) {
            delete query.filter;
        }
    }
    return query;
};
/**
 * Check if user has already set custom sort, page, or filters for this list
 *
 * User params come from the Redux store as the params props. By default,
 * this object is:
 *
 * { filter: {}, order: null, page: 1, perPage: null, sort: null }
 *
 * To check if the user has custom params, we must compare the params
 * to these initial values.
 *
 * @param {object} params
 */
export var hasCustomParams = function (params) {
    return (params &&
        params.filter &&
        (Object.keys(params.filter).length > 0 ||
            params.order != null ||
            params.page !== 1 ||
            params.perPage != null ||
            params.sort != null));
};
/**
 * Merge list params from 3 different sources:
 *   - the query string
 *   - the params stored in the state (from previous navigation)
 *   - the props passed to the List component (including the filter defaultValues)
 */
export var getQuery = function (_a) {
    var location = _a.location, params = _a.params, filterDefaultValues = _a.filterDefaultValues, sort = _a.sort, perPage = _a.perPage;
    var queryFromLocation = parseQueryFromLocation(location);
    var query = Object.keys(queryFromLocation).length > 0
        ? queryFromLocation
        : hasCustomParams(params)
            ? __assign({}, params) : { filter: filterDefaultValues || {} };
    if (!query.sort) {
        query.sort = sort.field;
        query.order = sort.order;
    }
    if (!query.perPage) {
        query.perPage = perPage;
    }
    if (!query.page) {
        query.page = 1;
    }
    return __assign(__assign({}, query), { page: getNumberOrDefault(query.page, 1), perPage: getNumberOrDefault(query.perPage, 10) });
};
export var getNumberOrDefault = function (possibleNumber, defaultValue) {
    return (typeof possibleNumber === 'string'
        ? parseInt(possibleNumber, 10)
        : possibleNumber) || defaultValue;
};
export default useListParams;
