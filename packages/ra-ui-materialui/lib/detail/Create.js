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
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var TitleForRecord_1 = __importDefault(require("../layout/TitleForRecord"));
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
var Create = function (props) { return (react_1.default.createElement(exports.CreateView, __assign({}, props, ra_core_1.useCreateController(props)))); };
Create.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    hasCreate: prop_types_1.default.bool,
    hasEdit: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    resource: prop_types_1.default.string.isRequired,
    title: prop_types_1.default.node,
    record: prop_types_1.default.object,
    hasList: prop_types_1.default.bool,
    successMessage: prop_types_1.default.string,
};
exports.CreateView = function (props) {
    var _a;
    var actions = props.actions, aside = props.aside, basePath = props.basePath, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, defaultTitle = props.defaultTitle, hasList = props.hasList, hasShow = props.hasShow, _b = props.record, record = _b === void 0 ? {} : _b, redirect = props.redirect, resource = props.resource, save = props.save, saving = props.saving, title = props.title, version = props.version, rest = __rest(props, ["actions", "aside", "basePath", "children", "classes", "className", "component", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "saving", "title", "version"]);
    ra_core_1.useCheckMinimumRequiredProps('Create', ['children'], props);
    var classes = useStyles({ classes: classesOverride });
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default('create-page', classes.root, className) }, sanitizeRestProps(rest)),
        react_1.default.createElement(TitleForRecord_1.default, { title: title, record: record, defaultTitle: defaultTitle }),
        actions &&
            react_1.cloneElement(actions, __assign({ basePath: basePath,
                resource: resource,
                hasList: hasList }, actions.props)),
        react_1.default.createElement("div", { className: classnames_1.default(classes.main, (_a = {},
                _a[classes.noActions] = !actions,
                _a)) },
            react_1.default.createElement(Content, { className: classes.card }, react_1.cloneElement(react_1.Children.only(children), {
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
                react_1.cloneElement(aside, {
                    basePath: basePath,
                    record: record,
                    resource: resource,
                    save: save,
                    saving: saving,
                    version: version,
                }))));
};
exports.CreateView.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    defaultTitle: prop_types_1.default.any,
    hasList: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool]),
    resource: prop_types_1.default.string,
    save: prop_types_1.default.func,
    title: prop_types_1.default.node,
};
exports.CreateView.defaultProps = {
    classes: {},
    component: Card_1.default,
};
var useStyles = styles_1.makeStyles(function (theme) {
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
exports.default = Create;
