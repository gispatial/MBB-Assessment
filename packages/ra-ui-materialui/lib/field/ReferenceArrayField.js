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
var LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var types_1 = require("./types");
/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */
var ReferenceArrayField = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    if (react_1.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayField> only accepts a single child (like <Datagrid>)');
    }
    return (react_1.default.createElement(PureReferenceArrayFieldView, __assign({}, props, ra_core_1.useReferenceArrayFieldController(props)), children));
};
ReferenceArrayField.propTypes = __assign(__assign({}, types_1.fieldPropTypes), { addLabel: prop_types_1.default.bool, basePath: prop_types_1.default.string, classes: prop_types_1.default.object, className: prop_types_1.default.string, children: prop_types_1.default.element.isRequired, label: prop_types_1.default.string, record: prop_types_1.default.object, reference: prop_types_1.default.string.isRequired, resource: prop_types_1.default.string, sortBy: prop_types_1.default.string, source: prop_types_1.default.string.isRequired });
ReferenceArrayField.defaultProps = {
    addLabel: true,
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    progress: { marginTop: theme.spacing(2) },
}); }, { name: 'RaReferenceArrayField' });
exports.ReferenceArrayFieldView = function (_a) {
    var children = _a.children, className = _a.className, classesOverride = _a.classes, data = _a.data, ids = _a.ids, loaded = _a.loaded, reference = _a.reference, referenceBasePath = _a.referenceBasePath;
    var classes = useStyles({ classes: classesOverride });
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, { className: classes.progress });
    }
    return react_1.cloneElement(react_1.Children.only(children), {
        className: className,
        resource: reference,
        ids: ids,
        data: data,
        loaded: loaded,
        basePath: referenceBasePath,
        currentSort: {},
    });
};
exports.ReferenceArrayFieldView.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    data: prop_types_1.default.object,
    ids: prop_types_1.default.array,
    loaded: prop_types_1.default.bool,
    children: prop_types_1.default.element.isRequired,
    reference: prop_types_1.default.string.isRequired,
    referenceBasePath: prop_types_1.default.string,
};
var PureReferenceArrayFieldView = react_1.memo(exports.ReferenceArrayFieldView);
exports.default = ReferenceArrayField;
