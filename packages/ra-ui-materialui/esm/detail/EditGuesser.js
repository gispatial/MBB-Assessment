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
import React, { useEffect, useState } from 'react';
import inflection from 'inflection';
import { useEditController, InferredElement, getElementsFromRecords, } from 'ra-core';
import { EditView } from './Edit';
import editFieldTypes from './editFieldTypes';
var EditViewGuesser = function (props) {
    var record = props.record, resource = props.resource;
    var _a = useState(null), inferredChild = _a[0], setInferredChild = _a[1];
    useEffect(function () {
        if (record && !inferredChild) {
            var inferredElements = getElementsFromRecords([record], editFieldTypes);
            var inferredChild_1 = new InferredElement(editFieldTypes.form, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed Edit:\n\nexport const " + inflection.capitalize(inflection.singularize(resource)) + "Edit = props => (\n    <Edit {...props}>\n" + inferredChild_1.getRepresentation() + "\n    </Edit>\n);");
            setInferredChild(inferredChild_1.getElement());
        }
    }, [record, inferredChild, resource]);
    return React.createElement(EditView, __assign({}, props), inferredChild);
};
EditViewGuesser.propTypes = EditView.propTypes;
var EditGuesser = function (props) { return (React.createElement(EditViewGuesser, __assign({}, props, useEditController(props)))); };
export default EditGuesser;
