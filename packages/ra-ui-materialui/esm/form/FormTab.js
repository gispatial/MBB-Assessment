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
import { Link } from 'react-router-dom';
import MuiTab from '@material-ui/core/Tab';
import classnames from 'classnames';
import { useTranslate } from 'ra-core';
import FormInput from './FormInput';
var sanitizeRestProps = function (_a) {
    var contentClassName = _a.contentClassName, label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["contentClassName", "label", "icon", "value", "translate"]);
    return rest;
};
var hiddenStyle = { display: 'none' };
var FormTab = function (_a) {
    var basePath = _a.basePath, className = _a.className, contentClassName = _a.contentClassName, children = _a.children, hidden = _a.hidden, icon = _a.icon, intent = _a.intent, label = _a.label, margin = _a.margin, record = _a.record, resource = _a.resource, variant = _a.variant, value = _a.value, rest = __rest(_a, ["basePath", "className", "contentClassName", "children", "hidden", "icon", "intent", "label", "margin", "record", "resource", "variant", "value"]);
    var translate = useTranslate();
    var renderHeader = function () { return (React.createElement(MuiTab, __assign({ key: label, label: translate(label, { _: label }), value: value, icon: icon, className: classnames('form-tab', className), component: Link, to: { pathname: value } }, sanitizeRestProps(rest)))); };
    var renderContent = function () { return (React.createElement("span", { style: hidden ? hiddenStyle : null, className: contentClassName }, React.Children.map(children, function (input) {
        return input && (React.createElement(FormInput, { basePath: basePath, input: input, record: record, resource: resource, variant: input.props.variant || variant, margin: input.props.margin || margin }));
    }))); };
    return intent === 'header' ? renderHeader() : renderContent();
};
FormTab.propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.node,
    intent: PropTypes.oneOf(['header', 'content']),
    hidden: PropTypes.bool,
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    value: PropTypes.string,
};
FormTab.displayName = 'FormTab';
export default FormTab;
