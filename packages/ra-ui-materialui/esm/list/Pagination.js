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
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TablePagination, Toolbar, useMediaQuery } from '@material-ui/core';
import { useTranslate, sanitizeListRestProps, ComponentPropType, } from 'ra-core';
import DefaultPaginationActions from './PaginationActions';
import DefaultPaginationLimit from './PaginationLimit';
var emptyArray = [];
var Pagination = function (_a) {
    var loading = _a.loading, page = _a.page, perPage = _a.perPage, rowsPerPageOptions = _a.rowsPerPageOptions, total = _a.total, setPage = _a.setPage, setPerPage = _a.setPerPage, actions = _a.actions, limit = _a.limit, rest = __rest(_a, ["loading", "page", "perPage", "rowsPerPageOptions", "total", "setPage", "setPerPage", "actions", "limit"]);
    useEffect(function () {
        if (page < 1 || isNaN(page)) {
            setPage(1);
        }
    }, [page, setPage]);
    var translate = useTranslate();
    var isSmall = useMediaQuery(function (theme) { return theme.breakpoints.down('sm'); });
    var getNbPages = function () { return Math.ceil(total / perPage) || 1; };
    /**
     * Warning: material-ui's page is 0-based
     */
    var handlePageChange = useCallback(function (event, page) {
        event && event.stopPropagation();
        if (page < 0 || page > getNbPages() - 1) {
            throw new Error(translate('ra.navigation.page_out_of_boundaries', {
                page: page + 1,
            }));
        }
        setPage(page + 1);
    }, [total, perPage, setPage, translate] // eslint-disable-line react-hooks/exhaustive-deps
    );
    var handlePerPageChange = useCallback(function (event) {
        setPerPage(event.target.value);
    }, [setPerPage]);
    var labelDisplayedRows = useCallback(function (_a) {
        var from = _a.from, to = _a.to, count = _a.count;
        return translate('ra.navigation.page_range_info', {
            offsetBegin: from,
            offsetEnd: to,
            total: count,
        });
    }, [translate]);
    if (total === 0) {
        return loading ? React.createElement(Toolbar, { variant: "dense" }) : limit;
    }
    if (isSmall) {
        return (React.createElement(TablePagination, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: handlePageChange, rowsPerPageOptions: emptyArray, component: "span", labelDisplayedRows: labelDisplayedRows }, sanitizeListRestProps(rest))));
    }
    return (React.createElement(TablePagination, __assign({ count: total, rowsPerPage: perPage, page: page - 1, onChangePage: handlePageChange, onChangeRowsPerPage: handlePerPageChange, ActionsComponent: actions, component: "span", labelRowsPerPage: translate('ra.navigation.page_rows_per_page'), labelDisplayedRows: labelDisplayedRows, rowsPerPageOptions: rowsPerPageOptions }, sanitizeListRestProps(rest))));
};
Pagination.propTypes = {
    actions: ComponentPropType,
    ids: PropTypes.array,
    limit: PropTypes.element,
    loading: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    total: PropTypes.number,
};
Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25],
    actions: DefaultPaginationActions,
    limit: React.createElement(DefaultPaginationLimit, null),
};
export default React.memo(Pagination);
