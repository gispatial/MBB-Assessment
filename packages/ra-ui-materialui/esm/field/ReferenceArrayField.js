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
import React, { Children, cloneElement, memo } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useReferenceArrayFieldController } from 'ra-core';
import { fieldPropTypes } from './types';
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
    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayField> only accepts a single child (like <Datagrid>)');
    }
    return (React.createElement(PureReferenceArrayFieldView, __assign({}, props, useReferenceArrayFieldController(props)), children));
};
ReferenceArrayField.propTypes = __assign(__assign({}, fieldPropTypes), { addLabel: PropTypes.bool, basePath: PropTypes.string, classes: PropTypes.object, className: PropTypes.string, children: PropTypes.element.isRequired, label: PropTypes.string, record: PropTypes.object, reference: PropTypes.string.isRequired, resource: PropTypes.string, sortBy: PropTypes.string, source: PropTypes.string.isRequired });
ReferenceArrayField.defaultProps = {
    addLabel: true,
};
var useStyles = makeStyles(function (theme) { return ({
    progress: { marginTop: theme.spacing(2) },
}); }, { name: 'RaReferenceArrayField' });
export var ReferenceArrayFieldView = function (_a) {
    var children = _a.children, className = _a.className, classesOverride = _a.classes, data = _a.data, ids = _a.ids, loaded = _a.loaded, reference = _a.reference, referenceBasePath = _a.referenceBasePath;
    var classes = useStyles({ classes: classesOverride });
    if (!loaded) {
        return React.createElement(LinearProgress, { className: classes.progress });
    }
    return cloneElement(Children.only(children), {
        className: className,
        resource: reference,
        ids: ids,
        data: data,
        loaded: loaded,
        basePath: referenceBasePath,
        currentSort: {},
    });
};
ReferenceArrayFieldView.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    ids: PropTypes.array,
    loaded: PropTypes.bool,
    children: PropTypes.element.isRequired,
    reference: PropTypes.string.isRequired,
    referenceBasePath: PropTypes.string,
};
var PureReferenceArrayFieldView = memo(ReferenceArrayFieldView);
export default ReferenceArrayField;
