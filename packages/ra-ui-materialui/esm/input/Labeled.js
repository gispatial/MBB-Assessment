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
import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { FieldTitle } from 'ra-core';
var useStyles = makeStyles(function (theme) { return ({
    label: {
        position: 'relative',
    },
    value: {
        fontFamily: theme.typography.fontFamily,
        color: 'currentColor',
        padding: theme.spacing(1) + "px 0 " + theme.spacing(1) / 2 + "px",
        border: 0,
        boxSizing: 'content-box',
        verticalAlign: 'middle',
        background: 'none',
        margin: 0,
        display: 'block',
        width: '100%',
    },
}); }, { name: 'RaLabeled' });
/**
 * Use any component as read-only Input, labeled just like other Inputs.
 *
 * Useful to use a Field in the Edit or Create components.
 * The child component will receive the current record.
 *
 * This component name doesn't have a typo. We had to choose between
 * the American English "Labeled", and the British English "Labelled".
 * We flipped a coin.
 *
 * @example
 * <Labeled label="Comments">
 *     <FooComponent source="title" />
 * </Labeled>
 */
var Labeled = function (_a) {
    var children = _a.children, className = _a.className, classesOverride = _a.classes, fullWidth = _a.fullWidth, id = _a.id, input = _a.input, isRequired = _a.isRequired, label = _a.label, _b = _a.margin, margin = _b === void 0 ? 'dense' : _b, meta = _a.meta, resource = _a.resource, source = _a.source, rest = __rest(_a, ["children", "className", "classes", "fullWidth", "id", "input", "isRequired", "label", "margin", "meta", "resource", "source"]);
    var classes = useStyles({ classes: classesOverride });
    if (!label && !source) {
        // @ts-ignore
        var name_1 = children && children.type && children.type.name;
        throw new Error("Cannot create label for component <" + name_1 + ">: You must set either the label or source props. You can also disable automated label insertion by setting 'addLabel: false' in the component default props");
    }
    var restProps = fullWidth ? __assign(__assign({}, rest), { fullWidth: fullWidth }) : rest;
    return (React.createElement(FormControl, { className: className, fullWidth: fullWidth, error: meta && meta.touched && !!meta.error, margin: margin },
        React.createElement(InputLabel, { htmlFor: id, shrink: true, className: classes.label },
            React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        React.createElement("div", { className: classes.value }, children && typeof children.type !== 'string'
            ? React.cloneElement(children, __assign({ input: input,
                resource: resource }, restProps))
            : children)));
};
Labeled.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    fullWidth: PropTypes.bool,
    id: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelStyle: PropTypes.object,
};
export default Labeled;
