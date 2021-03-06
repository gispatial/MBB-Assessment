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
var inflection_1 = __importDefault(require("inflection"));
var ra_core_1 = require("ra-core");
var List_1 = require("./List");
var listFieldTypes_1 = __importDefault(require("./listFieldTypes"));
var ListViewGuesser = function (props) {
    var ids = props.ids, data = props.data, resource = props.resource;
    var _a = react_1.useState(null), inferredChild = _a[0], setInferredChild = _a[1];
    react_1.useEffect(function () {
        if (ids.length > 0 && data && !inferredChild) {
            var inferredElements = ra_core_1.getElementsFromRecords(ids.map(function (id) { return data[id]; }), listFieldTypes_1.default);
            var inferredChild_1 = new ra_core_1.InferredElement(listFieldTypes_1.default.table, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed List:\n\nexport const " + inflection_1.default.capitalize(inflection_1.default.singularize(resource)) + "List = props => (\n    <List {...props}>\n" + inferredChild_1.getRepresentation() + "\n    </List>\n);");
            setInferredChild(inferredChild_1.getElement());
        }
    }, [data, ids, inferredChild, resource]);
    return react_1.default.createElement(List_1.ListView, __assign({}, props), inferredChild);
};
ListViewGuesser.propTypes = List_1.ListView.propTypes;
var ListGuesser = function (props) { return (react_1.default.createElement(ListViewGuesser, __assign({}, props, ra_core_1.useListController(props)))); };
exports.default = ListGuesser;
