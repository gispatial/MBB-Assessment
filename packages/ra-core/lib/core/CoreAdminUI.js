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
var react_router_dom_1 = require("react-router-dom");
var CoreAdminRouter_1 = __importDefault(require("./CoreAdminRouter"));
var DefaultLayout = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(react_1.default.Fragment, null, children));
};
var CoreAdminUI = function (_a) {
    var _b = _a.catchAll, catchAll = _b === void 0 ? Noop : _b, children = _a.children, _c = _a.customRoutes, customRoutes = _c === void 0 ? [] : _c, dashboard = _a.dashboard, _d = _a.layout, layout = _d === void 0 ? DefaultLayout : _d, _e = _a.loading, loading = _e === void 0 ? Noop : _e, _f = _a.loginPage, loginPage = _f === void 0 ? false : _f, logout = _a.logout, menu = _a.menu, // deprecated, use a custom layout instead
    theme = _a.theme, _g = _a.title, title = _g === void 0 ? 'React Admin' : _g;
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        loginPage !== false && loginPage !== true ? (react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/login", render: function (props) {
                return react_1.createElement(loginPage, __assign(__assign({}, props), { title: title,
                    theme: theme }));
            } })) : null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: function (props) { return (react_1.default.createElement(CoreAdminRouter_1.default, __assign({ catchAll: catchAll, customRoutes: customRoutes, dashboard: dashboard, layout: layout, loading: loading, logout: logout && react_1.createElement(logout), menu: menu, theme: theme, title: title }, props), children)); } })));
};
var Noop = function () { return null; };
exports.default = CoreAdminUI;
