"use strict";
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
var history_1 = require("history");
var connected_react_router_1 = require("connected-react-router");
var auth_1 = require("../auth");
var dataProvider_1 = require("../dataProvider");
var createAdminStore_1 = __importDefault(require("./createAdminStore"));
var TranslationProvider_1 = __importDefault(require("../i18n/TranslationProvider"));
var CoreAdminContext = function (_a) {
    var authProvider = _a.authProvider, dataProvider = _a.dataProvider, i18nProvider = _a.i18nProvider, children = _a.children, history = _a.history, customReducers = _a.customReducers, customSagas = _a.customSagas, initialState = _a.initialState;
    var reduxIsAlreadyInitialized = !!react_1.useContext(react_redux_1.ReactReduxContext);
    if (!dataProvider) {
        throw new Error("Missing dataProvider prop.\nReact-admin requires a valid dataProvider function to work.");
    }
    var finalAuthProvider = authProvider instanceof Function
        ? auth_1.convertLegacyAuthProvider(authProvider)
        : authProvider;
    var finalDataProvider = dataProvider instanceof Function
        ? dataProvider_1.convertLegacyDataProvider(dataProvider)
        : dataProvider;
    var finalHistory = history || history_1.createHashHistory();
    var renderCore = function () {
        return (react_1.default.createElement(auth_1.AuthContext.Provider, { value: finalAuthProvider },
            react_1.default.createElement(dataProvider_1.DataProviderContext.Provider, { value: finalDataProvider },
                react_1.default.createElement(TranslationProvider_1.default, { i18nProvider: i18nProvider }, typeof window !== 'undefined' ? (react_1.default.createElement(connected_react_router_1.ConnectedRouter, { history: finalHistory }, children)) : (children)))));
    };
    if (reduxIsAlreadyInitialized) {
        if (!history) {
            throw new Error("Missing history prop.\nWhen integrating react-admin inside an existing redux Provider, you must provide the same 'history' prop to the <Admin> as the one used to bootstrap your routerMiddleware.\nReact-admin uses this history for its own ConnectedRouter.");
        }
        return renderCore();
    }
    else {
        return (react_1.default.createElement(react_redux_1.Provider, { store: createAdminStore_1.default({
                authProvider: finalAuthProvider,
                customReducers: customReducers,
                customSagas: customSagas,
                dataProvider: finalDataProvider,
                initialState: initialState,
                history: finalHistory,
            }) }, renderCore()));
    }
};
exports.default = CoreAdminContext;
