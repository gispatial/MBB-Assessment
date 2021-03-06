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
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from './Placeholder';
import { useTimeout } from 'ra-core';
var useStyles = makeStyles(function (theme) { return ({
    primary: {
        width: '30vw',
        display: 'inline-block',
        marginBottom: theme.spacing(),
    },
    tertiary: { float: 'right', opacity: 0.541176, minWidth: '10vw' },
}); }, { name: 'RaSimpleListLoading' });
var times = function (nbChildren, fn) {
    return Array.from({ length: nbChildren }, function (_, key) { return fn(key); });
};
var SimpleListLoading = function (_a) {
    var classesOverride = _a.classes, className = _a.className, hasLeftAvatarOrIcon = _a.hasLeftAvatarOrIcon, hasRightAvatarOrIcon = _a.hasRightAvatarOrIcon, hasSecondaryText = _a.hasSecondaryText, hasTertiaryText = _a.hasTertiaryText, _b = _a.nbFakeLines, nbFakeLines = _b === void 0 ? 5 : _b, rest = __rest(_a, ["classes", "className", "hasLeftAvatarOrIcon", "hasRightAvatarOrIcon", "hasSecondaryText", "hasTertiaryText", "nbFakeLines"]);
    var classes = useStyles({ classes: classesOverride });
    var oneSecondHasPassed = useTimeout(1000);
    return oneSecondHasPassed ? (React.createElement(List, __assign({ className: className }, rest), times(nbFakeLines, function (key) { return (React.createElement(ListItem, null,
        hasLeftAvatarOrIcon && (React.createElement(ListItemAvatar, null,
            React.createElement(Avatar, null, "\u00A0"))),
        React.createElement(ListItemText, { primary: React.createElement("div", null,
                React.createElement(Placeholder, { className: classes.primary }),
                hasTertiaryText && (React.createElement("span", { className: classes.tertiary },
                    React.createElement(Placeholder, null)))), secondary: hasSecondaryText ? React.createElement(Placeholder, null) : undefined }),
        hasRightAvatarOrIcon && (React.createElement(ListItemSecondaryAction, null,
            React.createElement(Avatar, null, "\u00A0"))))); }))) : null;
};
SimpleListLoading.propTypes = {
    className: PropTypes.string,
    hasLeftAvatarOrIcon: PropTypes.bool,
    hasRightAvatarOrIcon: PropTypes.bool,
    hasSecondaryText: PropTypes.bool,
    hasTertiaryText: PropTypes.bool,
    nbFakeLines: PropTypes.number,
};
export default SimpleListLoading;
