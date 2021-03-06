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
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var ra_core_1 = require("ra-core");
var FilterButtonMenuItem = react_1.forwardRef(function (_a, ref) {
    var filter = _a.filter, onShow = _a.onShow, resource = _a.resource;
    var handleShow = react_1.useCallback(function () {
        onShow({ source: filter.source, defaultValue: filter.defaultValue });
    }, [filter.defaultValue, filter.source, onShow]);
    return (react_1.default.createElement(MenuItem_1.default, { className: "new-filter-item", "data-key": filter.source, "data-default-value": filter.defaultValue, key: filter.source, onClick: handleShow, ref: ref },
        react_1.default.createElement(ra_core_1.FieldTitle, { label: filter.label, source: filter.source, resource: resource })));
});
FilterButtonMenuItem.propTypes = {
    filter: prop_types_1.default.object.isRequired,
    onShow: prop_types_1.default.func.isRequired,
    resource: prop_types_1.default.string.isRequired,
};
exports.default = FilterButtonMenuItem;
