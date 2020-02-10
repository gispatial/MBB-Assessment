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
var ra_core_1 = require("ra-core");
var TopToolbar_1 = __importDefault(require("../layout/TopToolbar"));
var button_1 = require("../button");
var ListActions = function (_a) {
    var currentSort = _a.currentSort, className = _a.className, resource = _a.resource, filters = _a.filters, displayedFilters = _a.displayedFilters, exporter = _a.exporter, filterValues = _a.filterValues, permanentFilter = _a.permanentFilter, hasCreate = _a.hasCreate, basePath = _a.basePath, selectedIds = _a.selectedIds, onUnselectItems = _a.onUnselectItems, showFilter = _a.showFilter, total = _a.total, rest = __rest(_a, ["currentSort", "className", "resource", "filters", "displayedFilters", "exporter", "filterValues", "permanentFilter", "hasCreate", "basePath", "selectedIds", "onUnselectItems", "showFilter", "total"]);
    return react_1.useMemo(function () { return (react_1.default.createElement(TopToolbar_1.default, __assign({ className: className }, ra_core_1.sanitizeListRestProps(rest)),
        filters &&
            react_1.cloneElement(filters, {
                resource: resource,
                showFilter: showFilter,
                displayedFilters: displayedFilters,
                filterValues: filterValues,
                context: 'button',
            }),
        hasCreate && react_1.default.createElement(button_1.CreateButton, { basePath: basePath }),
        exporter !== false && (react_1.default.createElement(button_1.ExportButton, { disabled: total === 0, resource: resource, sort: currentSort, filter: __assign(__assign({}, filterValues), permanentFilter), exporter: exporter })))); }, [resource, displayedFilters, filterValues, selectedIds, filters, total] // eslint-disable-line react-hooks/exhaustive-deps
    );
};
ListActions.propTypes = {
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    currentSort: prop_types_1.default.object,
    displayedFilters: prop_types_1.default.object,
    exporter: prop_types_1.default.oneOfType([prop_types_1.default.func, prop_types_1.default.bool]),
    filters: prop_types_1.default.element,
    filterValues: prop_types_1.default.object,
    hasCreate: prop_types_1.default.bool,
    resource: prop_types_1.default.string,
    onUnselectItems: prop_types_1.default.func.isRequired,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any),
    showFilter: prop_types_1.default.func,
    total: prop_types_1.default.number,
};
ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: function () { return null; },
};
exports.default = ListActions;
