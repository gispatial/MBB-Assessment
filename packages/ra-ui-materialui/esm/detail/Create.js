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
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useCheckMinimumRequiredProps, useCreateController } from 'ra-core';
import TitleForRecord from '../layout/TitleForRecord';
/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The <Create> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - successMessage
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import React from 'react';
 * import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * // in src/App.js
 * import React from 'react';
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostCreate } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" create={PostCreate} />
 *     </Admin>
 * );
 * export default App;
 */
var Create = function (props) { return (React.createElement(CreateView, __assign({}, props, useCreateController(props)))); };
Create.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    title: PropTypes.node,
    record: PropTypes.object,
    hasList: PropTypes.bool,
    successMessage: PropTypes.string,
};
export var CreateView = function (props) {
    var _a;
    var actions = props.actions, aside = props.aside, basePath = props.basePath, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, defaultTitle = props.defaultTitle, hasList = props.hasList, hasShow = props.hasShow, _b = props.record, record = _b === void 0 ? {} : _b, redirect = props.redirect, resource = props.resource, save = props.save, saving = props.saving, title = props.title, version = props.version, rest = __rest(props, ["actions", "aside", "basePath", "children", "classes", "className", "component", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "saving", "title", "version"]);
    useCheckMinimumRequiredProps('Create', ['children'], props);
    var classes = useStyles({ classes: classesOverride });
    return (React.createElement("div", __assign({ className: classnames('create-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, { title: title, record: record, defaultTitle: defaultTitle }),
        actions &&
            cloneElement(actions, __assign({ basePath: basePath,
                resource: resource,
                hasList: hasList }, actions.props)),
        React.createElement("div", { className: classnames(classes.main, (_a = {},
                _a[classes.noActions] = !actions,
                _a)) },
            React.createElement(Content, { className: classes.card }, cloneElement(Children.only(children), {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined'
                    ? redirect
                    : children.props.redirect,
                resource: resource,
                save: save,
                saving: saving,
                version: version,
            })),
            aside &&
                cloneElement(aside, {
                    basePath: basePath,
                    record: record,
                    resource: resource,
                    save: save,
                    saving: saving,
                    version: version,
                }))));
};
CreateView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resource: PropTypes.string,
    save: PropTypes.func,
    title: PropTypes.node,
};
CreateView.defaultProps = {
    classes: {},
    component: Card,
};
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: {},
        main: {
            display: 'flex',
        },
        noActions: (_a = {},
            _a[theme.breakpoints.up('sm')] = {
                marginTop: '1em',
            },
            _a),
        card: {
            flex: '1 1 auto',
        },
    });
}, { name: 'RaCreate' });
var sanitizeRestProps = function (_a) {
    var actions = _a.actions, children = _a.children, className = _a.className, crudCreate = _a.crudCreate, loading = _a.loading, loaded = _a.loaded, saving = _a.saving, resource = _a.resource, title = _a.title, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, match = _a.match, location = _a.location, history = _a.history, options = _a.options, locale = _a.locale, permissions = _a.permissions, successMessage = _a.successMessage, translate = _a.translate, rest = __rest(_a, ["actions", "children", "className", "crudCreate", "loading", "loaded", "saving", "resource", "title", "hasCreate", "hasEdit", "hasList", "hasShow", "match", "location", "history", "options", "locale", "permissions", "successMessage", "translate"]);
    return rest;
};
export default Create;
