"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var HighlightOff_1 = __importDefault(require("@material-ui/icons/HighlightOff"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var emptyRecord = {};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    body: { display: 'flex', alignItems: 'flex-end' },
    spacer: { width: theme.spacing(2) },
    hideButton: {},
}); }, { name: 'RaFilterFormInput' });
var FilterFormInput = function (_a) {
    var filterElement = _a.filterElement, handleHide = _a.handleHide, classesOverride = _a.classes, resource = _a.resource, variant = _a.variant, margin = _a.margin;
    var translate = ra_core_1.useTranslate();
    var classes = useStyles({ classes: classesOverride });
    return (react_1.default.createElement("div", { "data-source": filterElement.props.source, className: classnames_1.default('filter-field', classes.body) },
        !filterElement.props.alwaysOn && (react_1.default.createElement(IconButton_1.default, { className: classnames_1.default('hide-filter', classes.hideButton), onClick: handleHide, "data-key": filterElement.props.source, title: translate('ra.action.remove_filter') },
            react_1.default.createElement(HighlightOff_1.default, null))),
        react_1.default.cloneElement(filterElement, {
            allowEmpty: true,
            resource: resource,
            record: emptyRecord,
            variant: variant,
            margin: margin,
            helperText: false,
        }),
        react_1.default.createElement("div", { className: classes.spacer }, "\u00A0")));
};
FilterFormInput.propTypes = {
    filterElement: prop_types_1.default.node,
    handleHide: prop_types_1.default.func,
    classes: prop_types_1.default.object,
    resource: prop_types_1.default.string,
};
exports.default = FilterFormInput;
