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
var GetApp_1 = __importDefault(require("@material-ui/icons/GetApp"));
var ra_core_1 = require("ra-core");
var Button_1 = __importDefault(require("./Button"));
var ExportButton = function (_a) {
    var sort = _a.sort, _b = _a.filter, filter = _b === void 0 ? defaultFilter : _b, _c = _a.maxResults, maxResults = _c === void 0 ? 1000 : _c, resource = _a.resource, onClick = _a.onClick, _d = _a.label, label = _d === void 0 ? 'ra.action.export' : _d, _e = _a.icon, icon = _e === void 0 ? defaultIcon : _e, rest = __rest(_a, ["sort", "filter", "maxResults", "resource", "onClick", "label", "icon"]);
    var exporter = react_1.useContext(ra_core_1.ExporterContext);
    var dataProvider = ra_core_1.useDataProvider();
    var notify = ra_core_1.useNotify();
    var handleClick = react_1.useCallback(function (event) {
        dataProvider
            .getList(resource, {
            sort: sort,
            filter: filter,
            pagination: { page: 1, perPage: maxResults },
        })
            .then(function (_a) {
            var data = _a.data;
            return exporter &&
                exporter(data, ra_core_1.fetchRelatedRecords(dataProvider), dataProvider, resource);
        })
            .catch(function (error) {
            console.error(error);
            notify('ra.notification.http_error', 'warning');
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [
        dataProvider,
        exporter,
        filter,
        maxResults,
        notify,
        onClick,
        resource,
        sort,
    ]);
    return (react_1.default.createElement(Button_1.default, __assign({ onClick: handleClick, label: label }, sanitizeRestProps(rest)), icon));
};
var defaultIcon = react_1.default.createElement(GetApp_1.default, null);
var defaultFilter = {};
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, exporter = _a.exporter, rest = __rest(_a, ["basePath", "exporter"]);
    return rest;
};
ExportButton.propTypes = {
    basePath: prop_types_1.default.string,
    exporter: prop_types_1.default.func,
    filter: prop_types_1.default.object,
    label: prop_types_1.default.string,
    maxResults: prop_types_1.default.number,
    resource: prop_types_1.default.string.isRequired,
    sort: prop_types_1.default.exact({
        field: prop_types_1.default.string,
        order: prop_types_1.default.string,
    }),
    icon: prop_types_1.default.element,
};
exports.default = ExportButton;
