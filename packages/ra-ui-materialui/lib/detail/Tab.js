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
var react_router_dom_1 = require("react-router-dom");
var Tab_1 = __importDefault(require("@material-ui/core/Tab"));
var ra_core_1 = require("ra-core");
var classnames_1 = __importDefault(require("classnames"));
var Labeled_1 = __importDefault(require("../input/Labeled"));
var sanitizeRestProps = function (_a) {
    var contentClassName = _a.contentClassName, label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["contentClassName", "label", "icon", "value", "translate"]);
    return rest;
};
/**
 * Tab element for the SimpleShowLayout.
 *
 * The `<Tab>` component accepts the following props:
 *
 * - label: The string displayed for each tab
 * - icon: The icon to show before the label (optional). Must be a component.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import FavoriteIcon from '@material-ui/icons/Favorite';
 *     import PersonPinIcon from '@material-ui/icons/PersonPin';
 *     import { Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <TabbedShowLayout>
 *                 <Tab label="Content" icon={<FavoriteIcon />}>
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </Tab>
 *                 <Tab label="Metadata" icon={<PersonIcon />}>
 *                     <TextField source="category" />
 *                </Tab>
 *             </TabbedShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
var Tab = function (_a) {
    var basePath = _a.basePath, children = _a.children, contentClassName = _a.contentClassName, context = _a.context, className = _a.className, icon = _a.icon, label = _a.label, record = _a.record, resource = _a.resource, value = _a.value, rest = __rest(_a, ["basePath", "children", "contentClassName", "context", "className", "icon", "label", "record", "resource", "value"]);
    var translate = ra_core_1.useTranslate();
    var renderHeader = function () { return (react_1.default.createElement(Tab_1.default, __assign({ key: label, label: translate(label, { _: label }), value: value, icon: icon, className: classnames_1.default('show-tab', className), component: react_router_dom_1.Link, to: value }, sanitizeRestProps(rest)))); };
    var renderContent = function () { return (react_1.default.createElement("span", { className: contentClassName }, react_1.default.Children.map(children, function (field) {
        return field && react_1.isValidElement(field) ? (react_1.default.createElement("div", { key: field.props.source, className: classnames_1.default('ra-field', "ra-field-" + field.props.source, field.props.className) }, field.props.addLabel ? (react_1.default.createElement(Labeled_1.default, { label: field.props.label, source: field.props.source, basePath: basePath, record: record, resource: resource }, field)) : typeof field.type === 'string' ? (field) : (react_1.default.cloneElement(field, {
            basePath: basePath,
            record: record,
            resource: resource,
        })))) : null;
    }))); };
    return context === 'header' ? renderHeader() : renderContent();
};
Tab.propTypes = {
    className: prop_types_1.default.string,
    contentClassName: prop_types_1.default.string,
    children: prop_types_1.default.node,
    context: prop_types_1.default.oneOf(['header', 'content']),
    icon: prop_types_1.default.element,
    label: prop_types_1.default.string.isRequired,
    value: prop_types_1.default.string,
};
exports.default = Tab;
