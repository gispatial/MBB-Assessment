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
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var classnames_1 = __importDefault(require("classnames"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var DatagridRow_1 = __importStar(require("./DatagridRow"));
var DatagridBody = function (_a) {
    var basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, data = _a.data, expand = _a.expand, hasBulkActions = _a.hasBulkActions, hover = _a.hover, ids = _a.ids, onToggleItem = _a.onToggleItem, resource = _a.resource, row = _a.row, rowClick = _a.rowClick, rowStyle = _a.rowStyle, selectedIds = _a.selectedIds, styles = _a.styles, version = _a.version, isRowSelectable = _a.isRowSelectable, rest = __rest(_a, ["basePath", "children", "classes", "className", "data", "expand", "hasBulkActions", "hover", "ids", "onToggleItem", "resource", "row", "rowClick", "rowStyle", "selectedIds", "styles", "version", "isRowSelectable"]);
    return (react_1.default.createElement(TableBody_1.default, __assign({ className: classnames_1.default('datagrid-body', className) }, rest), ids.map(function (id, rowIndex) {
        var _a;
        return react_1.cloneElement(row, {
            basePath: basePath,
            classes: classes,
            className: classnames_1.default(classes.row, (_a = {},
                _a[classes.rowEven] = rowIndex % 2 === 0,
                _a[classes.rowOdd] = rowIndex % 2 !== 0,
                _a[classes.clickableRow] = rowClick,
                _a)),
            expand: expand,
            hasBulkActions: hasBulkActions,
            hover: hover,
            id: id,
            key: id,
            onToggleItem: onToggleItem,
            record: data[id],
            resource: resource,
            rowClick: rowClick,
            selectable: !isRowSelectable || isRowSelectable(data[id]),
            selected: selectedIds.includes(id),
            style: rowStyle ? rowStyle(data[id], rowIndex) : null,
        }, children);
    })));
};
DatagridBody.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    children: prop_types_1.default.node,
    data: prop_types_1.default.object.isRequired,
    expand: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.elementType]),
    hasBulkActions: prop_types_1.default.bool.isRequired,
    hover: prop_types_1.default.bool,
    ids: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    onToggleItem: prop_types_1.default.func,
    resource: prop_types_1.default.string,
    row: prop_types_1.default.element,
    rowClick: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.func]),
    rowStyle: prop_types_1.default.func,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any),
    styles: prop_types_1.default.object,
    isRowSelectable: prop_types_1.default.func,
    version: prop_types_1.default.number,
};
DatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    row: react_1.default.createElement(DatagridRow_1.default, null),
};
// trick material-ui Table into thinking this is one of the child type it supports
DatagridBody.muiName = 'TableBody';
var areEqual = function (prevProps, nextProps) {
    var _ = prevProps.children, prevPropsWithoutChildren = __rest(prevProps, ["children"]);
    var __ = nextProps.children, nextPropsWithoutChildren = __rest(nextProps, ["children"]);
    return isEqual_1.default(prevPropsWithoutChildren, nextPropsWithoutChildren);
};
exports.PureDatagridBody = react_1.memo(DatagridBody, areEqual);
// trick material-ui Table into thinking this is one of the child type it supports
exports.PureDatagridBody.muiName = 'TableBody';
exports.PureDatagridBody.defaultProps = {
    row: react_1.default.createElement(DatagridRow_1.PureDatagridRow, null),
};
exports.default = DatagridBody;
