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
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return ({
        toolbar: (_a = {
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingRight: 0
            },
            _a[theme.breakpoints.up('xs')] = {
                paddingLeft: 0,
            },
            _a[theme.breakpoints.down('xs')] = {
                paddingLeft: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
            },
            _a),
        actions: (_b = {
                paddingTop: theme.spacing(3),
                minHeight: theme.spacing(5)
            },
            _b[theme.breakpoints.down('xs')] = {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
            },
            _b),
    });
}, { name: 'RaListToolbar' });
var defaultClasses = {}; // avoid needless updates
var ListToolbar = function (_a) {
    var _b = _a.classes, classes = _b === void 0 ? defaultClasses : _b, filters = _a.filters, filterValues = _a.filterValues, // dynamically set via the UI by the user
    permanentFilter = _a.permanentFilter, // set in the List component by the developer
    actions = _a.actions, exporter = _a.exporter, rest = __rest(_a, ["classes", "filters", "filterValues", "permanentFilter", "actions", "exporter"]);
    var styles = useStyles({ classes: classes });
    return (React.createElement(Toolbar, { className: styles.toolbar },
        filters &&
            React.cloneElement(filters, __assign(__assign({}, rest), { filterValues: filterValues, context: 'form' })),
        React.createElement("span", null),
        actions &&
            React.cloneElement(actions, __assign(__assign(__assign({}, rest), { className: styles.actions, exporter: exporter,
                filters: filters,
                filterValues: filterValues,
                permanentFilter: permanentFilter }), actions.props))));
};
ListToolbar.propTypes = {
    classes: PropTypes.object,
    filters: PropTypes.element,
    permanentFilter: PropTypes.object,
    actions: PropTypes.element,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
export default React.memo(ListToolbar);
