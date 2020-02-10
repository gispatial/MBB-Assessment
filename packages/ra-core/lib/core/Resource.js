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
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var WithPermissions_1 = __importDefault(require("../auth/WithPermissions"));
var actions_1 = require("../actions");
var defaultOptions = {};
var ResourceRegister = function (_a) {
    var name = _a.name, list = _a.list, create = _a.create, edit = _a.edit, show = _a.show, icon = _a.icon, _b = _a.options, options = _b === void 0 ? defaultOptions : _b;
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(actions_1.registerResource({
            name: name,
            options: options,
            hasList: !!list,
            hasEdit: !!edit,
            hasShow: !!show,
            hasCreate: !!create,
            icon: icon,
        }));
        return function () { return dispatch(actions_1.unregisterResource(name)); };
    }, [dispatch, name, create, edit, icon, list, show, options]);
    return null;
};
var ResourceRoutes = function (_a) {
    var name = _a.name, match = _a.match, list = _a.list, create = _a.create, edit = _a.edit, show = _a.show, _b = _a.options, options = _b === void 0 ? defaultOptions : _b;
    var isRegistered = react_redux_1.useSelector(function (state) { return !!state.admin.resources[name]; });
    var basePath = match ? match.path : '';
    // match tends to change even on the same route ; using memo to avoid an extra render
    return react_1.useMemo(function () {
        // if the registration hasn't finished, no need to render
        if (!isRegistered) {
            return null;
        }
        var props = {
            resource: name,
            options: options,
            hasList: !!list,
            hasEdit: !!edit,
            hasShow: !!show,
            hasCreate: !!create,
        };
        return (react_1.default.createElement(react_router_dom_1.Switch, null,
            create && (react_1.default.createElement(react_router_dom_1.Route, { path: basePath + "/create", render: function (routeProps) { return (react_1.default.createElement(WithPermissions_1.default, __assign({ component: create, basePath: basePath }, routeProps, props))); } })),
            show && (react_1.default.createElement(react_router_dom_1.Route, { path: basePath + "/:id/show", render: function (routeProps) { return (react_1.default.createElement(WithPermissions_1.default, __assign({ component: show, basePath: basePath, id: decodeURIComponent(routeProps.match.params
                        .id) }, routeProps, props))); } })),
            edit && (react_1.default.createElement(react_router_dom_1.Route, { path: basePath + "/:id", render: function (routeProps) { return (react_1.default.createElement(WithPermissions_1.default, __assign({ component: edit, basePath: basePath, id: decodeURIComponent(routeProps.match.params
                        .id) }, routeProps, props))); } })),
            list && (react_1.default.createElement(react_router_dom_1.Route, { path: "" + basePath, render: function (routeProps) { return (react_1.default.createElement(WithPermissions_1.default, __assign({ component: list, basePath: basePath }, routeProps, props))); } }))));
    }, [basePath, name, create, edit, list, show, options, isRegistered]); // eslint-disable-line react-hooks/exhaustive-deps
};
var Resource = function (_a) {
    var _b = _a.intent, intent = _b === void 0 ? 'route' : _b, props = __rest(_a, ["intent"]);
    return intent === 'registration' ? (react_1.default.createElement(ResourceRegister, __assign({}, props))) : (react_1.default.createElement(ResourceRoutes, __assign({}, props)));
};
exports.default = Resource;
