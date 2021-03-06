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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import useDataProvider from './useDataProvider';
import getFetchType from './getFetchType';
import { useSafeSetState } from '../util/hooks';
/**
 * Lists of records are initialized to a particular object,
 * so detecting if the list is empty requires some work.
 *
 * @see src/reducer/admin/data.ts
 */
var isEmptyList = function (data) {
    return Array.isArray(data)
        ? data.length === 0
        : data &&
            Object.keys(data).length === 0 &&
            data.hasOwnProperty('fetchedAt');
};
/**
 * Default cache selector. Allows to cache responses by default.
 *
 * By default, custom queries are dispatched as a CUSTOM_QUERY Redux action.
 * The useDataProvider hookdispatches a CUSTOM_QUERY_SUCCESS when the response
 * comes, and the customQueries reducer stores the result in the store.
 * This selector reads the customQueries store and acts as a response cache.
 */
var defaultDataSelector = function (query) { return function (state) {
    var key = JSON.stringify(__assign(__assign({}, query), { type: getFetchType(query.type) }));
    return state.admin.customQueries[key]
        ? state.admin.customQueries[key].data
        : undefined;
}; };
var defaultTotalSelector = function () { return null; };
/**
 * Fetch the data provider through Redux, return the value from the store.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * @param {Object} query
 * @param {string} query.type The verb passed to th data provider, e.g. 'getList', 'getOne'
 * @param {string} query.resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} query.payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {Function} options.onSuccess Side effect function to be executed upon success of failure, e.g. { onSuccess: response => refresh() } }
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. { onFailure: error => notify(error.message) } }
 * @param {function} dataSelector Redux selector to get the result. Required.
 * @param {function} totalSelector Redux selector to get the total (optional, only for LIST queries)
 *
 * @returns The current request state. Destructure as { data, total, error, loading, loaded }.
 *
 * @example
 *
 * import { useQueryWithStore } from 'react-admin';
 *
 * const UserProfile = ({ record }) => {
 *     const { data, loading, error } = useQueryWithStore(
 *         {
 *             type: 'getOne',
 *             resource: 'users',
 *             payload: { id: record.id }
 *         },
 *         {},
 *         state => state.admin.resources.users.data[record.id]
 *     );
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <div>User {data.username}</div>;
 * };
 */
var useQueryWithStore = function (query, options, dataSelector, totalSelector) {
    if (options === void 0) { options = { action: 'CUSTOM_QUERY' }; }
    if (dataSelector === void 0) { dataSelector = defaultDataSelector(query); }
    if (totalSelector === void 0) { totalSelector = defaultTotalSelector; }
    var type = query.type, resource = query.resource, payload = query.payload;
    var data = useSelector(dataSelector);
    var total = useSelector(totalSelector);
    var _a = useSafeSetState({
        data: data,
        total: total,
        error: null,
        loading: true,
        loaded: data !== undefined && !isEmptyList(data),
    }), state = _a[0], setState = _a[1];
    if (!isEqual(state.data, data) || state.total !== total) {
        if (isNaN(total)) {
            console.error('Total from response is not a number. Please check your dataProvider or the API.');
        }
        else {
            setState(__assign(__assign({}, state), { data: data,
                total: total, loaded: true }));
        }
    }
    var dataProvider = useDataProvider();
    useEffect(function () {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        dataProvider[type](resource, payload, options)
            .then(function () {
            // We don't care about the dataProvider response here, because
            // it was already passed to SUCCESS reducers by the dataProvider
            // hook, and the result is available from the Redux store
            // through the data and total selectors.
            // In addition, if the query is optimistic, the response
            // will be empty, so it should not be used at all.
            setState(function (prevState) { return (__assign(__assign({}, prevState), { error: null, loading: false, loaded: true })); });
        })
            .catch(function (error) {
            setState({
                error: error,
                loading: false,
                loaded: false,
            });
        });
        // deep equality, see https://github.com/facebook/react/issues/14476#issuecomment-471199055
    }, [JSON.stringify({ query: query, options: options })]); // eslint-disable-line
    return state;
};
export default useQueryWithStore;
