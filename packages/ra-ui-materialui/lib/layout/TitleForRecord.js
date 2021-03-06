"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var Title_1 = __importStar(require("./Title"));
var TitleForRecord = function (_a) {
    var defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title;
    return record ? (react_1.default.createElement(Title_1.default, { title: title, record: record, defaultTitle: defaultTitle })) : ('');
};
TitleForRecord.propTypes = {
    defaultTitle: prop_types_1.default.any,
    record: prop_types_1.default.object,
    title: Title_1.TitlePropType,
};
exports.default = TitleForRecord;
