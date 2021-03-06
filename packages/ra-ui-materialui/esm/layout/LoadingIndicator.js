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
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIconButton from '../button/RefreshIconButton';
var useStyles = makeStyles({
    loader: {
        margin: 14,
    },
}, { name: 'RaLoadingIndicator' });
var LoadingIndicator = function (_a) {
    var classesOverride = _a.classes, className = _a.className, rest = __rest(_a, ["classes", "className"]);
    var loading = useSelector(function (state) { return state.admin.loading > 0; });
    var classes = useStyles({ classes: classesOverride });
    return loading ? (React.createElement(CircularProgress, __assign({ className: classNames('app-loader', classes.loader, className), color: "inherit", size: 18, thickness: 5 }, rest))) : (React.createElement(RefreshIconButton, null));
};
LoadingIndicator.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.string,
};
export default LoadingIndicator;
