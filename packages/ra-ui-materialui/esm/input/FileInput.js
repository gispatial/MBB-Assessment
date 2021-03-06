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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { Children, cloneElement, isValidElement, } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from 'recompose';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import classnames from 'classnames';
import { useInput, useTranslate } from 'ra-core';
import Labeled from './Labeled';
import FileInputPreview from './FileInputPreview';
import sanitizeRestProps from './sanitizeRestProps';
import InputHelperText from './InputHelperText';
var useStyles = makeStyles(function (theme) { return ({
    dropZone: {
        background: theme.palette.background.default,
        cursor: 'pointer',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
    preview: {},
    removeButton: {},
    root: { width: '100%' },
}); }, { name: 'RaFileInput' });
var FileInput = function (_a) {
    var accept = _a.accept, children = _a.children, className = _a.className, classesOverride = _a.classes, format = _a.format, helperText = _a.helperText, label = _a.label, _b = _a.labelMultiple, labelMultiple = _b === void 0 ? 'ra.input.file.upload_several' : _b, _c = _a.labelSingle, labelSingle = _c === void 0 ? 'ra.input.file.upload_single' : _c, maxSize = _a.maxSize, minSize = _a.minSize, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.options, _f = _e === void 0 ? {} : _e, inputPropsOptions = _f.inputProps, options = __rest(_f, ["inputProps"]), parse = _a.parse, placeholder = _a.placeholder, resource = _a.resource, source = _a.source, validate = _a.validate, rest = __rest(_a, ["accept", "children", "className", "classes", "format", "helperText", "label", "labelMultiple", "labelSingle", "maxSize", "minSize", "multiple", "options", "parse", "placeholder", "resource", "source", "validate"]);
    var translate = useTranslate();
    var classes = useStyles({ classes: classesOverride });
    // turn a browser dropped file structure into expected structure
    var transformFile = function (file) {
        var _a;
        if (!(file instanceof File)) {
            return file;
        }
        var _b = Children.only(children).props, source = _b.source, title = _b.title;
        var preview = URL.createObjectURL(file);
        var transformedFile = (_a = {
                rawFile: file
            },
            _a[source] = preview,
            _a);
        if (title) {
            transformedFile[title] = file.name;
        }
        return transformedFile;
    };
    var transformFiles = function (files) {
        if (!files) {
            return multiple ? [] : null;
        }
        if (Array.isArray(files)) {
            return files.map(transformFile);
        }
        return transformFile(files);
    };
    var _g = useInput(__assign({ format: format || transformFiles, parse: parse || transformFiles, source: source, type: 'file', validate: validate }, rest)), id = _g.id, _h = _g.input, onChange = _h.onChange, value = _h.value, inputProps = __rest(_h, ["onChange", "value"]), meta = _g.meta, isRequired = _g.isRequired;
    var touched = meta.touched, error = meta.error;
    var files = value ? (Array.isArray(value) ? value : [value]) : [];
    var onDrop = function (newFiles, rejectedFiles, event) {
        var updatedFiles = multiple ? __spreadArrays(files, newFiles) : __spreadArrays(newFiles);
        if (multiple) {
            onChange(updatedFiles);
        }
        else {
            onChange(updatedFiles[0]);
        }
        if (options.onDrop) {
            options.onDrop(newFiles, rejectedFiles, event);
        }
    };
    var onRemove = function (file) { return function () {
        if (multiple) {
            var filteredFiles = files.filter(function (stateFile) { return !shallowEqual(stateFile, file); });
            onChange(filteredFiles);
        }
        else {
            onChange(null);
        }
    }; };
    var childrenElement = isValidElement(Children.only(children))
        ? Children.only(children)
        : undefined;
    var _j = useDropzone(__assign(__assign({}, options), { accept: accept,
        maxSize: maxSize,
        minSize: minSize,
        multiple: multiple,
        onDrop: onDrop })), getRootProps = _j.getRootProps, getInputProps = _j.getInputProps;
    return (React.createElement(Labeled, __assign({ id: id, label: label, className: classnames(classes.root, className), source: source, resource: resource, isRequired: isRequired, meta: meta }, sanitizeRestProps(rest)),
        React.createElement(React.Fragment, null,
            React.createElement("div", __assign({ "data-testid": "dropzone", className: classes.dropZone }, getRootProps()),
                React.createElement("input", __assign({ id: id }, getInputProps(__assign(__assign({}, inputProps), inputPropsOptions)))),
                placeholder ? (placeholder) : multiple ? (React.createElement("p", null, translate(labelMultiple))) : (React.createElement("p", null, translate(labelSingle)))),
            children && (React.createElement("div", { className: "previews" }, files.map(function (file, index) { return (React.createElement(FileInputPreview, { key: index, file: file, onRemove: onRemove(file), className: classes.removeButton }, cloneElement(childrenElement, {
                record: file,
                className: classes.preview,
            }))); }))),
            React.createElement(FormHelperText, null,
                React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText })))));
};
FileInput.propTypes = {
    accept: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    labelMultiple: PropTypes.string,
    labelSingle: PropTypes.string,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    multiple: PropTypes.bool,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    placeholder: PropTypes.node,
};
export default FileInput;
