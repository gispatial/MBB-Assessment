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
import Datagrid from '../list/Datagrid';
import ArrayField from '../field/ArrayField';
import BooleanField from '../field/BooleanField';
import DateField from '../field/DateField';
import EmailField from '../field/EmailField';
import NumberField from '../field/NumberField';
import ReferenceField from '../field/ReferenceField';
import ReferenceArrayField from '../field/ReferenceArrayField';
import RichTextField from '../field/RichTextField';
import SimpleShowLayout from './SimpleShowLayout';
import TextField from '../field/TextField';
import UrlField from '../field/UrlField';
export default {
    show: {
        component: function (props) { return React.createElement(SimpleShowLayout, __assign({}, props)); },
        representation: function (_, children) { return "        <SimpleShowLayout>\n" + children.map(function (child) { return "            " + child.getRepresentation(); }).join('\n') + "\n        </SimpleShowLayout>"; },
    },
    array: {
        // eslint-disable-next-line react/display-name
        component: function (_a) {
            var children = _a.children, props = __rest(_a, ["children"]);
            return (React.createElement(ArrayField, __assign({}, props),
                React.createElement(Datagrid, null, children)));
        },
        representation: function (props, children) {
            return "<ArrayField source=\"" + props.source + "\"><Datagrid>" + children
                .map(function (child) { return child.getRepresentation(); })
                .join('\n') + "</Datagrid></ArrayField>";
        },
    },
    boolean: {
        component: BooleanField,
        representation: function (props) { return "<BooleanField source=\"" + props.source + "\" />"; },
    },
    date: {
        component: DateField,
        representation: function (props) { return "<DateField source=\"" + props.source + "\" />"; },
    },
    email: {
        component: EmailField,
        representation: function (props) { return "<EmailField source=\"" + props.source + "\" />"; },
    },
    id: {
        component: TextField,
        representation: function (props) { return "<TextField source=\"" + props.source + "\" />"; },
    },
    number: {
        component: NumberField,
        representation: function (props) { return "<NumberField source=\"" + props.source + "\" />"; },
    },
    reference: {
        component: ReferenceField,
        representation: function (props) {
            return "<ReferenceField source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextField source=\"id\" /></ReferenceField>";
        },
    },
    referenceChild: {
        component: function (props) { return React.createElement(TextField, __assign({ source: "id" }, props)); },
        representation: function () { return "<TextField source=\"id\" />"; },
    },
    referenceArray: {
        component: ReferenceArrayField,
        representation: function (props) {
            return "<ReferenceArrayField source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextField source=\"id\" /></ReferenceArrayField>";
        },
    },
    referenceArrayChild: {
        component: function (props) { return React.createElement(TextField, __assign({ source: "id" }, props)); },
        representation: function () { return "<TextField source=\"id\" />"; },
    },
    richText: {
        component: RichTextField,
        representation: function (props) { return "<RichTextField source=\"" + props.source + "\" />"; },
    },
    string: {
        component: TextField,
        representation: function (props) { return "<TextField source=\"" + props.source + "\" />"; },
    },
    url: {
        component: UrlField,
        representation: function (props) { return "<UrlField source=\"" + props.source + "\" />"; },
    },
};
