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
var Edit_1 = require("./Edit");
var editFieldTypes_1 = __importDefault(require("./editFieldTypes"));
var EditViewGuesser = function (props) {
    var record = props.record, resource = props.resource;
    var _a = react_1.useState(null), inferredChild = _a[0], setInferredChild = _a[1];
    react_1.useEffect(function () {
        if (record && !inferredChild) {
            var inferredElements = ra_core_1.getElementsFromRecords([record], editFieldTypes_1.default);
            var inferredChild_1 = new ra_core_1.InferredElement(editFieldTypes_1.default.form, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed Edit:\n\nexport const " + inflection_1.default.capitalize(inflection_1.default.singularize(resource)) + "Edit = props => (\n    <Edit {...props}>\n" + inferredChild_1.getRepresentation() + "\n    </Edit>\n);");
            setInferredChild(inferredChild_1.getElement());
        }
    }, [record, inferredChild, resource]);
    return react_1.default.createElement(Edit_1.EditView, __assign({}, props), inferredChild);
};
EditViewGuesser.propTypes = Edit_1.EditView.propTypes;
var EditGuesser = function (props) { return (react_1.default.createElement(EditViewGuesser, __assign({}, props, ra_core_1.useEditController(props)))); };
exports.default = EditGuesser;
