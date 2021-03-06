"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var accumulateActions_1 = require("../../actions/accumulateActions");
var reducer_1 = require("../../reducer");
var hooks_1 = require("../../util/hooks");
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
exports.default = (function (_a) {
    var reference = _a.reference, _b = _a.referenceSource, referenceSource = _b === void 0 ? defaultReferenceSource : _b, resource = _a.resource, source = _a.source, filter = _a.filter, pagination = _a.pagination, sort = _a.sort, id = _a.id;
    var dispatch = react_redux_1.useDispatch();
    hooks_1.useDeepCompareEffect(function () {
        dispatch(accumulateActions_1.crudGetMatchingAccumulate(reference, referenceSource(resource, source), pagination, sort, filter));
    }, [
        dispatch,
        filter,
        reference,
        referenceSource,
        resource,
        source,
        pagination,
        sort,
    ]);
    var matchingReferences = useGetMatchingReferenceSelector({
        referenceSource: referenceSource,
        reference: reference,
        resource: resource,
        source: source,
        id: id,
    });
    if (!matchingReferences) {
        return {
            loading: true,
            error: null,
            matchingReferences: null,
        };
    }
    if (matchingReferences.error) {
        return {
            loading: false,
            matchingReferences: null,
            error: matchingReferences.error,
        };
    }
    return {
        loading: false,
        error: null,
        matchingReferences: matchingReferences,
    };
});
var useGetMatchingReferenceSelector = function (_a) {
    var referenceSource = _a.referenceSource, reference = _a.reference, resource = _a.resource, source = _a.source, id = _a.id;
    var getMatchingReferences = react_1.useCallback(function (state) {
        var referenceResource = reducer_1.getReferenceResource(state, {
            reference: reference,
        });
        var possibleValues = reducer_1.getPossibleReferenceValues(state, {
            referenceSource: referenceSource,
            resource: resource,
            source: source,
        });
        return reducer_1.getPossibleReferences(referenceResource, possibleValues, [
            id,
        ]);
    }, [referenceSource, reference, resource, source, id]);
    return react_redux_1.useSelector(getMatchingReferences);
};
