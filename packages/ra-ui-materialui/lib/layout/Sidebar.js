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
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var get_1 = __importDefault(require("lodash/get"));
var ra_core_1 = require("ra-core");
exports.DRAWER_WIDTH = 240;
exports.CLOSED_DRAWER_WIDTH = 55;
var useStyles = core_1.makeStyles(function (theme) {
    var _a;
    return ({
        drawerPaper: (_a = {
                position: 'relative',
                height: 'auto',
                overflowX: 'hidden',
                width: function (props) {
                    return props.open
                        ? get_1.default(theme, 'sidebar.width', exports.DRAWER_WIDTH)
                        : get_1.default(theme, 'sidebar.closedWidth', exports.CLOSED_DRAWER_WIDTH);
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
    var dispatch = react_redux_1.useDispatch();
    var isXSmall = core_1.useMediaQuery(function (theme) { return theme.breakpoints.down('xs'); });
    var isSmall = core_1.useMediaQuery(function (theme) { return theme.breakpoints.down('sm'); });
    // FIXME negating isXSmall and isSmall should be enough, but unfortunately
    // mui media queries use a two pass system and are always false at first
    // see https://github.com/mui-org/material-ui/issues/14336
    var isDesktop = core_1.useMediaQuery(function (theme) { return theme.breakpoints.up('md'); });
    react_1.useEffect(function () {
        if (isDesktop) {
            dispatch(ra_core_1.setSidebarVisibility(true)); // FIXME renders with a closed sidebar at first
        }
    }, [isDesktop, dispatch]);
    var open = react_redux_1.useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    react_redux_1.useSelector(function (state) { return state.locale; }); // force redraw on locale change
    var handleClose = function () { return dispatch(ra_core_1.setSidebarVisibility(false)); };
    var toggleSidebar = function () { return dispatch(ra_core_1.setSidebarVisibility(!open)); };
    var classes = useStyles({ classes: classesOverride, open: open });
    return isXSmall ? (react_1.default.createElement(core_1.Drawer, __assign({ variant: "temporary", open: open, PaperProps: {
            className: classes.drawerPaper,
        }, onClose: toggleSidebar }, rest), react_1.cloneElement(react_1.Children.only(children), {
        onMenuClick: handleClose,
    }))) : isSmall ? (react_1.default.createElement(core_1.Drawer, __assign({ variant: "permanent", open: open, PaperProps: {
            className: classes.drawerPaper,
        }, onClose: toggleSidebar }, rest), react_1.cloneElement(react_1.Children.only(children), {
        onMenuClick: handleClose,
    }))) : (react_1.default.createElement(core_1.Drawer, __assign({ variant: "permanent", open: open, PaperProps: {
            className: classes.drawerPaper,
        }, onClose: toggleSidebar }, rest), children));
};
Sidebar.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
exports.default = Sidebar;
