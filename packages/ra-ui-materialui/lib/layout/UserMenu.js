"use strict";
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
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var UserMenu = function (props) {
    var _a = react_1.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var translate = ra_core_1.useTranslate();
    var children = props.children, label = props.label, icon = props.icon, logout = props.logout;
    if (!logout && !children)
        return null;
    var open = Boolean(anchorEl);
    var handleMenu = function (event) { return setAnchorEl(event.currentTarget); };
    var handleClose = function () { return setAnchorEl(null); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Tooltip_1.default, { title: label && translate(label, { _: label }) },
            react_1.default.createElement(IconButton_1.default, { "aria-label": label && translate(label, { _: label }), "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", onClick: handleMenu }, icon)),
        react_1.default.createElement(Menu_1.default, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, open: open, onClose: handleClose },
            react_1.Children.map(children, function (menuItem) {
                return react_1.isValidElement(menuItem)
                    ? react_1.cloneElement(menuItem, {
                        onClick: handleClose,
                    })
                    : null;
            }),
            logout)));
};
UserMenu.propTypes = {
    children: prop_types_1.default.node,
    label: prop_types_1.default.string.isRequired,
    logout: prop_types_1.default.element,
    icon: prop_types_1.default.node,
};
UserMenu.defaultProps = {
    label: 'ra.auth.user_menu',
    icon: react_1.default.createElement(AccountCircle_1.default, null),
};
exports.default = UserMenu;
