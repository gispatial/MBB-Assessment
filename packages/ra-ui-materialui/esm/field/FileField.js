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
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';
import { fieldPropTypes } from './types';
var useStyles = makeStyles({
    root: { display: 'inline-block' },
}, { name: 'RaFileField' });
var FileField = function (_a) {
    var className = _a.className, classesOverride = _a.classes, record = _a.record, source = _a.source, title = _a.title, src = _a.src, target = _a.target, rest = __rest(_a, ["className", "classes", "record", "source", "title", "src", "target"]);
    var sourceValue = get(record, source);
    var classes = useStyles({ classes: classesOverride });
    if (!sourceValue) {
        return (React.createElement("div", __assign({ className: classnames(classes.root, className) }, sanitizeRestProps(rest))));
    }
    if (Array.isArray(sourceValue)) {
        return (React.createElement("ul", __assign({ className: classnames(classes.root, className) }, sanitizeRestProps(rest)), sourceValue.map(function (file, index) {
            var fileTitleValue = get(file, title) || title;
            var srcValue = get(file, src) || title;
            return (React.createElement("li", { key: index },
                React.createElement("a", { href: srcValue, title: fileTitleValue, target: target }, fileTitleValue)));
        })));
    }
    var titleValue = get(record, title) || title;
    return (React.createElement("div", __assign({ className: classnames(classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement("a", { href: sourceValue, title: titleValue, target: target }, titleValue)));
};
FileField.defaultProps = {
    addLabel: true,
};
FileField.propTypes = __assign(__assign({}, fieldPropTypes), { src: PropTypes.string, title: PropTypes.string, target: PropTypes.string });
export default FileField;
