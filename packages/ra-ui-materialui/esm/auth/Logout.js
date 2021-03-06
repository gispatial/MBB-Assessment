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
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItemIcon, MenuItem, makeStyles } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import classnames from 'classnames';
import { useTranslate, useLogout } from 'ra-core';
var useStyles = makeStyles(function (theme) { return ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    icon: { minWidth: theme.spacing(5) },
}); }, { name: 'RaLogout' });
/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
var LogoutWithRef = React.forwardRef(function Logout(props, ref) {
    var className = props.className, redirectTo = props.redirectTo, icon = props.icon, rest = __rest(props, ["className", "redirectTo", "icon"]);
    var classes = useStyles({}); // the empty {} is a temp fix for https://github.com/mui-org/material-ui/issues/15942
    var translate = useTranslate();
    var logout = useLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var handleClick = useCallback(function () { return logout(redirectTo); }, [
        redirectTo,
        logout,
    ]);
    return (React.createElement(MenuItem, __assign({ className: classnames('logout', classes.menuItem, className), onClick: handleClick, ref: ref }, rest),
        React.createElement(ListItemIcon, { className: classes.icon }, icon ? icon : React.createElement(ExitIcon, null)),
        translate('ra.auth.logout')));
});
LogoutWithRef.propTypes = {
    className: PropTypes.string,
    redirectTo: PropTypes.string,
    icon: PropTypes.element,
};
export default LogoutWithRef;
