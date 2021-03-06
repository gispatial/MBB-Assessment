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
var prop_types_1 = __importDefault(require("prop-types"));
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var classnames_1 = __importDefault(require("classnames"));
var Placeholder_1 = __importDefault(require("./Placeholder"));
var ra_core_1 = require("ra-core");
var times = function (nbChildren, fn) {
    return Array.from({ length: nbChildren }, function (_, key) { return fn(key); });
};
var DatagridLoading = function (_a) {
    var classes = _a.classes, className = _a.className, expand = _a.expand, hasBulkActions = _a.hasBulkActions, nbChildren = _a.nbChildren, _b = _a.nbFakeLines, nbFakeLines = _b === void 0 ? 5 : _b, size = _a.size;
    var oneSecondHasPassed = ra_core_1.useTimeout(1000);
    return oneSecondHasPassed ? (react_1.default.createElement(Table_1.default, { className: classnames_1.default(classes.table, className), size: size },
        react_1.default.createElement(TableHead_1.default, null,
            react_1.default.createElement(TableRow_1.default, { className: classes.row },
                expand && (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classes.expandHeader })),
                hasBulkActions && (react_1.default.createElement(TableCell_1.default, { padding: "checkbox", className: classes.expandIconCell },
                    react_1.default.createElement(Checkbox_1.default, { className: "select-all", color: "primary", checked: false }))),
                times(nbChildren, function (key) { return (react_1.default.createElement(TableCell_1.default, { variant: "head", className: classes.headerCell, key: key },
                    react_1.default.createElement(Placeholder_1.default, null))); }))),
        react_1.default.createElement(TableBody_1.default, null, times(nbFakeLines, function (key1) { return (react_1.default.createElement(TableRow_1.default, { key: key1, style: { opacity: 1 / (key1 + 1) } },
            expand && (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classes.expandIconCell },
                react_1.default.createElement(IconButton_1.default, { className: classes.expandIcon, component: "div", "aria-hidden": "true" },
                    react_1.default.createElement(ExpandMore_1.default, null)))),
            hasBulkActions && (react_1.default.createElement(TableCell_1.default, { padding: "checkbox", className: classes.expandIconCell },
                react_1.default.createElement(Checkbox_1.default, { className: "select-all", color: "primary", checked: false }))),
            times(nbChildren, function (key2) { return (react_1.default.createElement(TableCell_1.default, { className: classes.rowCell, key: key2 },
                react_1.default.createElement(Placeholder_1.default, null))); }))); })))) : null;
};
DatagridLoading.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    expand: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.elementType]),
    hasBulkActions: prop_types_1.default.bool,
    nbChildren: prop_types_1.default.number,
    nbFakeLines: prop_types_1.default.number,
    size: prop_types_1.default.oneOf(['small', 'medium']),
};
exports.default = react_1.memo(DatagridLoading);
