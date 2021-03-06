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
var core_1 = require("@material-ui/core");
var ra_core_1 = require("ra-core");
var PaginationActions_1 = __importDefault(require("./PaginationActions"));
var PaginationLimit_1 = __importDefault(require("./PaginationLimit"));
var emptyArray = [];
var Pagination = function (_a) {
    var loading = _a.loading, page = _a.page, perPage = _a.perPage, rowsPerPageOptions = _a.rowsPerPageOptions, total = _a.total, setPage = _a.setPage, setPerPage = _a.setPerPage, actions = _a.actions, limit = _a.limit, rest = __rest(_a, ["loading", "page", "perPage", "rowsPerPageOptions", "total", "setPage", "setPerPage", "actions", "limit"]);
    react_1.useEffect(function () {
        if (page < 1 || isNaN(page)) {
            setPage(1);
        }
    }, [page, setPage]);
    var translate = ra_core_1.useTranslate();
    var isSmall = core_1.useMediaQuery(function (theme) { return theme.breakpoints.down('sm'); });
    var getNbPages = function () { return Math.ceil(total / perPage) || 1; };
    /**
     * Warning: material-ui's page is 0-based
     */
    var handlePageChange = react_1.useCallback(function (event, page) {
        event && event.stopPropagation();
        if (page < 0 || page > getNbPages() - 1) {
            throw new Error(translate('ra.navigation.page_out_of_boundaries', {
                page: page + 1,
            }));
        }
        setPage(page + 1);
    }, [total, perPage, setPage, translate] // eslint-disable-line react-hooks/exhaustive-deps
    );
    var handlePerPageChange = react_1.useCallback(function (event) {
        setPerPage(event.target.value);
    }, [setPerPage]);
    var labelDisplayedRows = react_1.useCallback(function (_a) {
        var from = _a.from, to = _a.to, count = _a.count;
        return translate('ra.navigation.page_range_info', {
            offsetBegin: from,
            offsetEnd: to,
            total: count,
        });
    }, [translate]);
    if (total === 0) {
        return loading ? react_1.default.createElement(core_1.Toolbar, { variant: "dense" }) : limit;
    }
    if (isSmall) {
        return (react_1.default.createElement(core_1.TablePagination, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: handlePageChange, rowsPerPageOptions: emptyArray, component: "span", labelDisplayedRows: labelDisplayedRows }, ra_core_1.sanitizeListRestProps(rest))));
    }
    return (react_1.default.createElement(core_1.TablePagination, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: handlePageChange, onChangeRowsPerPage: handlePerPageChange, ActionsComponent: actions, component: "span", labelRowsPerPage: translate('ra.navigation.page_rows_per_page'), labelDisplayedRows: labelDisplayedRows, rowsPerPageOptions: rowsPerPageOptions }, ra_core_1.sanitizeListRestProps(rest))));
};
Pagination.propTypes = {
    actions: ra_core_1.ComponentPropType,
    ids: prop_types_1.default.array,
    limit: prop_types_1.default.element,
    loading: prop_types_1.default.bool,
    page: prop_types_1.default.number,
    perPage: prop_types_1.default.number,
    rowsPerPageOptions: prop_types_1.default.arrayOf(prop_types_1.default.number),
    setPage: prop_types_1.default.func,
    setPerPage: prop_types_1.default.func,
    total: prop_types_1.default.number,
};
Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25],
    actions: PaginationActions_1.default,
    limit: react_1.default.createElement(PaginationLimit_1.default, null),
};
exports.default = react_1.default.memo(Pagination);
