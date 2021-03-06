import React, { Children, cloneElement, isValidElement, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'ra-core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
var UserMenu = function (props) {
    var _a = useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var translate = useTranslate();
    var children = props.children, label = props.label, icon = props.icon, logout = props.logout;
    if (!logout && !children)
        return null;
    var open = Boolean(anchorEl);
    var handleMenu = function (event) { return setAnchorEl(event.currentTarget); };
    var handleClose = function () { return setAnchorEl(null); };
    return (React.createElement("div", null,
        React.createElement(Tooltip, { title: label && translate(label, { _: label }) },
            React.createElement(IconButton, { "aria-label": label && translate(label, { _: label }), "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", onClick: handleMenu }, icon)),
        React.createElement(Menu, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, open: open, onClose: handleClose },
            Children.map(children, function (menuItem) {
                return isValidElement(menuItem)
                    ? cloneElement(menuItem, {
                        onClick: handleClose,
                    })
                    : null;
            }),
            logout)));
};
UserMenu.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    logout: PropTypes.element,
    icon: PropTypes.node,
};
UserMenu.defaultProps = {
    label: 'ra.auth.user_menu',
    icon: React.createElement(AccountCircle, null),
};
export default UserMenu;
