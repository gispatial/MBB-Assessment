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
var classnames_1 = __importDefault(require("classnames"));
var react_router_dom_1 = require("react-router-dom");
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var styles_1 = require("@material-ui/core/styles");
var NavLinkRef = react_1.forwardRef(function (props, ref) { return (react_1.default.createElement(react_router_dom_1.NavLink, __assign({ innerRef: ref }, props))); });
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        color: theme.palette.text.secondary,
    },
    active: {
        color: theme.palette.text.primary,
    },
    icon: { minWidth: theme.spacing(5) },
}); }, { name: 'RaMenuItemLink' });
var MenuItemLink = react_1.forwardRef(function (_a, ref) {
    var classesOverride = _a.classes, className = _a.className, primaryText = _a.primaryText, leftIcon = _a.leftIcon, onClick = _a.onClick, sidebarIsOpen = _a.sidebarIsOpen, props = __rest(_a, ["classes", "className", "primaryText", "leftIcon", "onClick", "sidebarIsOpen"]);
    var classes = useStyles({ classes: classesOverride });
    var handleMenuTap = react_1.useCallback(function (e) {
        onClick && onClick(e);
    }, [onClick]);
    var renderMenuItem = function () {
        return (react_1.default.createElement(MenuItem_1.default, __assign({ className: classnames_1.default(classes.root, className), activeClassName: classes.active, component: NavLinkRef, ref: ref }, props, { onClick: handleMenuTap }),
            leftIcon && (react_1.default.createElement(ListItemIcon_1.default, { className: classes.icon }, react_1.cloneElement(leftIcon, {
                titleAccess: primaryText,
            }))),
            primaryText));
    };
    if (sidebarIsOpen) {
        return renderMenuItem();
    }
    return (react_1.default.createElement(Tooltip_1.default, { title: primaryText, placement: "right" }, renderMenuItem()));
});
MenuItemLink.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    leftIcon: prop_types_1.default.element,
    onClick: prop_types_1.default.func,
    primaryText: prop_types_1.default.node,
    staticContext: prop_types_1.default.object,
    to: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]).isRequired,
    sidebarIsOpen: prop_types_1.default.bool,
};
exports.default = MenuItemLink;
