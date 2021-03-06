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
import React, { useEffect, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, makeStyles, useMediaQuery } from '@material-ui/core';
import lodashGet from 'lodash/get';
import { setSidebarVisibility } from 'ra-core';
export var DRAWER_WIDTH = 240;
export var CLOSED_DRAWER_WIDTH = 55;
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        drawerPaper: (_a = {
                position: 'relative',
                height: 'auto',
                overflowX: 'hidden',
                width: function (props) {
                    return props.open
                        ? lodashGet(theme, 'sidebar.width', DRAWER_WIDTH)
                        : lodashGet(theme, 'sidebar.closedWidth', CLOSED_DRAWER_WIDTH);
                },
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                backgroundColor: 'transparent',
                marginTop: '0.5em',
                borderRight: 'none'
            },
            _a[theme.breakpoints.only('xs')] = {
                marginTop: 0,
                height: '100vh',
                position: 'inherit',
                backgroundColor: theme.palette.background.default,
            },
            _a[theme.breakpoints.up('md')] = {
                border: 'none',
                marginTop: '1.5em',
            },
            _a.zIndex = 'inherit',
            _a),
    });
}, { name: 'RaSidebar' });
var Sidebar = function (_a) {
    var children = _a.children, closedSize = _a.closedSize, size = _a.size, classesOverride = _a.classes, rest = __rest(_a, ["children", "closedSize", "size", "classes"]);
    var dispatch = useDispatch();
    var isXSmall = useMediaQuery(function (theme) { return theme.breakpoints.down('xs'); });
    var isSmall = useMediaQuery(function (theme) { return theme.breakpoints.down('sm'); });
    // FIXME negating isXSmall and isSmall should be enough, but unfortunately
    // mui media queries use a two pass system and are always false at first
    // see https://github.com/mui-org/material-ui/issues/14336
    var isDesktop = useMediaQuery(function (theme) { return theme.breakpoints.up('md'); });
    useEffect(function () {
        if (isDesktop) {
            dispatch(setSidebarVisibility(true)); // FIXME renders with a closed sidebar at first
        }
    }, [isDesktop, dispatch]);
    var open = useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    useSelector(function (state) { return state.locale; }); // force redraw on locale change
    var handleClose = function () { return dispatch(setSidebarVisibility(false)); };
    var toggleSidebar = function () { return dispatch(setSidebarVisibility(!open)); };
    var classes = useStyles({ classes: classesOverride, open: open });
    return isXSmall ? (React.createElement(Drawer, __assign({ variant: "temporary", open: open, PaperProps: {
            className: classes.drawerPaper,
        }, onClose: toggleSidebar }, rest), cloneElement(Children.only(children), {
        onMenuClick: handleClose,
    }))) : isSmall ? (React.createElement(Drawer, __assign({ variant: "permanent", open: open, PaperProps: {
            className: classes.drawerPaper,
        }, onClose: toggleSidebar }, rest), cloneElement(Children.only(children), {
        onMenuClick: handleClose,
    }))) : (React.createElement(Drawer, __assign({ variant: "permanent", open: open, PaperProps: {
            className: classes.drawerPaper,
        }, onClose: toggleSidebar }, rest), children));
};
Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Sidebar;
