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
var PowerSettingsNew_1 = __importDefault(require("@material-ui/icons/PowerSettingsNew"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var useStyles = core_1.makeStyles(function (theme) { return ({
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
var LogoutWithRef = react_1.default.forwardRef(function Logout(props, ref) {
    var className = props.className, redirectTo = props.redirectTo, icon = props.icon, rest = __rest(props, ["className", "redirectTo", "icon"]);
    var classes = useStyles({}); // the empty {} is a temp fix for https://github.com/mui-org/material-ui/issues/15942
    var translate = ra_core_1.useTranslate();
    var logout = ra_core_1.useLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var handleClick = react_1.useCallback(function () { return logout(redirectTo); }, [
        redirectTo,
        logout,
    ]);
    return (react_1.default.createElement(core_1.MenuItem, __assign({ className: classnames_1.default('logout', classes.menuItem, className), onClick: handleClick, ref: ref }, rest),
        react_1.default.createElement(core_1.ListItemIcon, { className: classes.icon }, icon ? icon : react_1.default.createElement(PowerSettingsNew_1.default, null)),
        translate('ra.auth.logout')));
});
LogoutWithRef.propTypes = {
    className: prop_types_1.default.string,
    redirectTo: prop_types_1.default.string,
    icon: prop_types_1.default.element,
};
exports.default = LogoutWithRef;
