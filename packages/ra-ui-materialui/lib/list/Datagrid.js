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
var ra_core_1 = require("ra-core");
var styles_1 = require("@material-ui/core/styles");
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var classnames_1 = __importDefault(require("classnames"));
var DatagridHeaderCell_1 = __importDefault(require("./DatagridHeaderCell"));
var DatagridLoading_1 = __importDefault(require("./DatagridLoading"));
var DatagridBody_1 = __importStar(require("./DatagridBody"));
var useStyles = styles_1.makeStyles(function (theme) { return ({
    table: {
        tableLayout: 'auto',
    },
    thead: {},
    tbody: {},
    headerRow: {},
    headerCell: {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
    },
    checkbox: {},
    row: {},
    clickableRow: {
        cursor: 'pointer',
    },
    rowEven: {},
    rowOdd: {},
    rowCell: {},
    expandHeader: {
        padding: 0,
        width: theme.spacing(6),
    },
    expandIconCell: {
        width: theme.spacing(6),
    },
    expandIcon: {
        padding: theme.spacing(1),
        transform: 'rotate(-90deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expanded: {
        transform: 'rotate(0deg)',
    },
}); }, { name: 'RaDatagrid' });
/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - rowStyle
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */
function Datagrid(_a) {
    var classesOverride = _a.classes, props = __rest(_a, ["classes"]);
    var classes = useStyles({ classes: classesOverride });
    var basePath = props.basePath, _b = props.optimized, optimized = _b === void 0 ? false : _b, _c = props.body, body = _c === void 0 ? optimized ? react_1.default.createElement(DatagridBody_1.PureDatagridBody, null) : react_1.default.createElement(DatagridBody_1.default, null) : _c, children = props.children, className = props.className, currentSort = props.currentSort, data = props.data, expand = props.expand, hasBulkActions = props.hasBulkActions, hover = props.hover, ids = props.ids, loading = props.loading, loaded = props.loaded, onSelect = props.onSelect, onToggleItem = props.onToggleItem, resource = props.resource, rowClick = props.rowClick, rowStyle = props.rowStyle, selectedIds = props.selectedIds, setSort = props.setSort, _d = props.size, size = _d === void 0 ? 'small' : _d, total = props.total, isRowSelectable = props.isRowSelectable, version = props.version, rest = __rest(props, ["basePath", "optimized", "body", "children", "className", "currentSort", "data", "expand", "hasBulkActions", "hover", "ids", "loading", "loaded", "onSelect", "onToggleItem", "resource", "rowClick", "rowStyle", "selectedIds", "setSort", "size", "total", "isRowSelectable", "version"]);
    var updateSort = react_1.useCallback(function (event) {
        event.stopPropagation();
        setSort(event.currentTarget.dataset.sort);
    }, [setSort]);
    var handleSelectAll = react_1.useCallback(function (event) {
        if (event.target.checked) {
            var all_1 = ids.concat(selectedIds.filter(function (id) { return !ids.includes(id); }));
            onSelect(isRowSelectable
                ? all_1.filter(function (id) { return isRowSelectable(data[id]); })
                : all_1);
        }
        else {
            onSelect([]);
        }
    }, [data, ids, onSelect, isRowSelectable, selectedIds]);
    /**
     * if loaded is false, the list displays for the first time, and the dataProvider hasn't answered yet
     * if loaded is true, the data for the list has at least been returned once by the dataProvider
     * if loaded is undefined, the Datagrid parent doesn't track loading state (e.g. ReferenceArrayField)
     */
    if (loaded === false) {
        return (react_1.default.createElement(DatagridLoading_1.default, { classes: classes, className: className, expand: expand, hasBulkActions: hasBulkActions, nbChildren: react_1.default.Children.count(children), size: size }));
    }
    /**
     * Once loaded, the data for the list may be empty. Instead of
     * displaying the table header with zero data rows,
     * the datagrid displays nothing in this case.
     */
    if (loaded && (ids.length === 0 || total === 0)) {
        return null;
    }
    var all = isRowSelectable
        ? ids.filter(function (id) { return isRowSelectable(data[id]); })
        : ids;
    /**
     * After the initial load, if the data for the list isn't empty,
     * and even if the data is refreshing (e.g. after a filter change),
     * the datagrid displays the current data.
     */
    return (react_1.default.createElement(Table_1.default, __assign({ className: classnames_1.default(classes.table, className), size: size }, ra_core_1.sanitizeListRestProps(rest)),
        react_1.default.createElement(TableHead_1.default, { className: classes.thead },
            react_1.default.createElement(TableRow_1.default, { className: classnames_1.default(classes.row, classes.headerRow) },
                expand && (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classnames_1.default(classes.headerCell, classes.expandHeader) })),
                hasBulkActions && (react_1.default.createElement(TableCell_1.default, { padding: "checkbox", className: classes.headerCell },
                    react_1.default.createElement(Checkbox_1.default, { className: "select-all", color: "primary", checked: selectedIds.length > 0 &&
                            all.length > 0 &&
                            all.every(function (id) { return selectedIds.includes(id); }), onChange: handleSelectAll }))),
                react_1.Children.map(children, function (field, index) {
                    return react_1.isValidElement(field) ? (react_1.default.createElement(DatagridHeaderCell_1.default, { className: classes.headerCell, currentSort: currentSort, field: field, isSorting: currentSort.field ===
                            (field.props.sortBy || field.props.source), key: field.props.source || index, resource: resource, updateSort: updateSort })) : null;
                }))),
        react_1.cloneElement(body, {
            basePath: basePath,
            className: classes.tbody,
            classes: classes,
            expand: expand,
            rowClick: rowClick,
            data: data,
            hasBulkActions: hasBulkActions,
            hover: hover,
            ids: ids,
            onToggleItem: onToggleItem,
            resource: resource,
            rowStyle: rowStyle,
            selectedIds: selectedIds,
            isRowSelectable: isRowSelectable,
            version: version,
        }, children)));
}
Datagrid.propTypes = {
    basePath: prop_types_1.default.string,
    body: prop_types_1.default.element,
    children: prop_types_1.default.node.isRequired,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    currentSort: prop_types_1.default.shape({
        field: prop_types_1.default.string,
        order: prop_types_1.default.string,
    }),
    data: prop_types_1.default.object.isRequired,
    expand: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.elementType]),
    hasBulkActions: prop_types_1.default.bool.isRequired,
    hover: prop_types_1.default.bool,
    ids: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    loading: prop_types_1.default.bool,
    onSelect: prop_types_1.default.func,
    onToggleItem: prop_types_1.default.func,
    resource: prop_types_1.default.string,
    rowClick: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.func]),
    rowStyle: prop_types_1.default.func,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    setSort: prop_types_1.default.func,
    total: prop_types_1.default.number,
    version: prop_types_1.default.number,
    isRowSelectable: prop_types_1.default.func,
};
Datagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: [],
};
exports.default = Datagrid;
