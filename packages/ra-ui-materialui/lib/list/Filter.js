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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var FilterForm_1 = __importDefault(require("./FilterForm"));
var FilterButton_1 = __importDefault(require("./FilterButton"));
var useStyles = styles_1.makeStyles({
    button: {},
    form: {},
}, { name: 'RaFilter' });
var Filter = function (props) {
    var classes = useStyles({ classes: props.classes });
    var renderButton = function () {
        var classesOverride = props.classes, context = props.context, resource = props.resource, children = props.children, showFilter = props.showFilter, hideFilter = props.hideFilter, displayedFilters = props.displayedFilters, filterValues = props.filterValues, variant = props.variant, rest = __rest(props, ["classes", "context", "resource", "children", "showFilter", "hideFilter", "displayedFilters", "filterValues", "variant"]);
        return (react_1.default.createElement(FilterButton_1.default, __assign({ className: classes.button, resource: resource, filters: react_1.default.Children.toArray(children), showFilter: showFilter, displayedFilters: displayedFilters, filterValues: filterValues }, ra_core_1.sanitizeListRestProps(rest))));
    };
    var renderForm = function () {
        var classesOverride = props.classes, context = props.context, resource = props.resource, children = props.children, hideFilter = props.hideFilter, displayedFilters = props.displayedFilters, showFilter = props.showFilter, filterValues = props.filterValues, setFilters = props.setFilters, rest = __rest(props, ["classes", "context", "resource", "children", "hideFilter", "displayedFilters", "showFilter", "filterValues", "setFilters"]);
        return (react_1.default.createElement(FilterForm_1.default, __assign({ className: classes.form, resource: resource, filters: react_1.default.Children.toArray(children), hideFilter: hideFilter, displayedFilters: displayedFilters, initialValues: filterValues, setFilters: setFilters }, ra_core_1.sanitizeListRestProps(rest))));
    };
    return props.context === 'button' ? renderButton() : renderForm();
};
Filter.propTypes = {
    children: prop_types_1.default.node,
    classes: prop_types_1.default.object,
    context: prop_types_1.default.oneOf(['form', 'button']),
    displayedFilters: prop_types_1.default.object,
    filterValues: prop_types_1.default.object,
    hideFilter: prop_types_1.default.func,
    setFilters: prop_types_1.default.func,
    showFilter: prop_types_1.default.func,
    resource: prop_types_1.default.string.isRequired,
};
exports.default = Filter;
