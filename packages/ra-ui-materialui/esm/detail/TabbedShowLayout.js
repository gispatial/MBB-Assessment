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
import React, { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
import { escapePath } from 'ra-core';
import TabbedShowLayoutTabs, { getTabFullPath } from './TabbedShowLayoutTabs';
var sanitizeRestProps = function (_a) {
    var children = _a.children, className = _a.className, record = _a.record, resource = _a.resource, basePath = _a.basePath, version = _a.version, initialValues = _a.initialValues, staticContext = _a.staticContext, translate = _a.translate, tabs = _a.tabs, rest = __rest(_a, ["children", "className", "record", "resource", "basePath", "version", "initialValues", "staticContext", "translate", "tabs"]);
    return rest;
};
var useStyles = makeStyles(function (theme) { return ({
    content: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}); }, { name: 'RaTabbedShowLayout' });
/**
 * Tabbed Layout for a Show view, showing fields grouped in tabs.
 *
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Tab components.
 * The component passed as `tabs` props replaces the default material-ui's <Tabs> component.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <TabbedShowLayout>
 *                 <Tab label="Content">
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </Tab>
 *                 <Tab label="Metadata">
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
var TabbedShowLayout = function (_a) {
    var basePath = _a.basePath, children = _a.children, classesOverride = _a.classes, className = _a.className, record = _a.record, resource = _a.resource, version = _a.version, value = _a.value, tabs = _a.tabs, rest = __rest(_a, ["basePath", "children", "classes", "className", "record", "resource", "version", "value", "tabs"]);
    var match = useRouteMatch();
    var classes = useStyles({ classes: classesOverride });
    return (React.createElement("div", __assign({ className: className, key: version }, sanitizeRestProps(rest)),
        cloneElement(tabs, {}, children),
        React.createElement(Divider, null),
        React.createElement("div", { className: classes.content }, Children.map(children, function (tab, index) {
            return tab && isValidElement(tab) ? (React.createElement(Route, { exact: true, path: escapePath(getTabFullPath(tab, index, match.url)), render: function () {
                    return cloneElement(tab, {
                        context: 'content',
                        resource: resource,
                        record: record,
                        basePath: basePath,
                    });
                } })) : null;
        }))));
};
TabbedShowLayout.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    location: PropTypes.object,
    match: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    value: PropTypes.number,
    version: PropTypes.number,
    tabs: PropTypes.element,
};
TabbedShowLayout.defaultProps = {
    tabs: React.createElement(TabbedShowLayoutTabs, null),
};
export default TabbedShowLayout;
