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
import React, { useState, useEffect } from 'react';
import inflection from 'inflection';
import { useListController, getElementsFromRecords, InferredElement, } from 'ra-core';
import { ListView } from './List';
import listFieldTypes from './listFieldTypes';
var ListViewGuesser = function (props) {
    var ids = props.ids, data = props.data, resource = props.resource;
    var _a = useState(null), inferredChild = _a[0], setInferredChild = _a[1];
    useEffect(function () {
        if (ids.length > 0 && data && !inferredChild) {
            var inferredElements = getElementsFromRecords(ids.map(function (id) { return data[id]; }), listFieldTypes);
            var inferredChild_1 = new InferredElement(listFieldTypes.table, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed List:\n\nexport const " + inflection.capitalize(inflection.singularize(resource)) + "List = props => (\n    <List {...props}>\n" + inferredChild_1.getRepresentation() + "\n    </List>\n);");
            setInferredChild(inferredChild_1.getElement());
        }
    }, [data, ids, inferredChild, resource]);
    return React.createElement(ListView, __assign({}, props), inferredChild);
};
ListViewGuesser.propTypes = ListView.propTypes;
var ListGuesser = function (props) { return (React.createElement(ListViewGuesser, __assign({}, props, useListController(props)))); };
export default ListGuesser;
