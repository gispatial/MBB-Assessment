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
import { shallowEqual, useSelector } from 'react-redux';
// @ts-ignore
import inflection from 'inflection';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';
import classnames from 'classnames';
import { getResources, useTranslate } from 'ra-core';
import DashboardMenuItem from './DashboardMenuItem';
import MenuItemLink from './MenuItemLink';
var useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
}, { name: 'RaMenu' });
var translatedResourceName = function (resource, translate) {
    return translate("resources." + resource.name + ".name", {
        smart_count: 2,
        _: resource.options && resource.options.label
            ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
            })
            : inflection.humanize(inflection.pluralize(resource.name)),
    });
};
var Menu = function (_a) {
    var classesOverride = _a.classes, className = _a.className, dense = _a.dense, hasDashboard = _a.hasDashboard, onMenuClick = _a.onMenuClick, logout = _a.logout, rest = __rest(_a, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "logout"]);
    var translate = useTranslate();
    var classes = useStyles({ classes: classesOverride });
    var isXSmall = useMediaQuery(function (theme) {
        return theme.breakpoints.down('xs');
    });
    var open = useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var resources = useSelector(getResources, shallowEqual);
    // Used to force redraw on navigation
    useSelector(function (state) { return state.router.location.pathname; });
    return (React.createElement("div", __assign({ className: classnames(classes.main, className) }, rest),
        hasDashboard && (React.createElement(DashboardMenuItem, { onClick: onMenuClick, dense: dense, sidebarIsOpen: open })),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (React.createElement(MenuItemLink, { key: resource.name, to: "/" + resource.name, primaryText: translatedResourceName(resource, translate), leftIcon: resource.icon ? React.createElement(resource.icon, null) : React.createElement(DefaultIcon, null), onClick: onMenuClick, dense: dense, sidebarIsOpen: open })); }),
        isXSmall && logout));
};
Menu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
};
Menu.defaultProps = {
    onMenuClick: function () { return null; },
};
export default Menu;
