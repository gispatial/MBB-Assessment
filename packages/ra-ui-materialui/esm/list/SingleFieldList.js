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
import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { linkToRecord } from 'ra-core';
import Link from '../Link';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: -theme.spacing(1),
        marginBottom: -theme.spacing(1),
    },
}); }, { name: 'RaSingleFieldList' });
// useful to prevent click bubbling in a datagrid with rowClick
var stopPropagation = function (e) { return e.stopPropagation(); };
var sanitizeRestProps = function (_a) {
    var currentSort = _a.currentSort, setSort = _a.setSort, loading = _a.loading, loaded = _a.loaded, props = __rest(_a, ["currentSort", "setSort", "loading", "loaded"]);
    return props;
};
// Our handleClick does nothing as we wrap the children inside a Link but it is
// required by ChipField, which uses a Chip from material-ui.
// The material-ui Chip requires an onClick handler to behave like a clickable element.
var handleClick = function () { };
/**
 * Iterator component to be used to display a list of entities, using a single field
 *
 * @example Display all the books by the current author
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, it includes a link to the <Edit> page of the related record
 * (`/books/:id` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceManyField reference="books" target="author_id" linkType="show">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * You can also prevent `<SingleFieldList>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceManyField reference="books" target="author_id" linkType={false}>
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 */
function SingleFieldList(_a) {
    var classesOverride = _a.classes, className = _a.className, ids = _a.ids, data = _a.data, loaded = _a.loaded, resource = _a.resource, basePath = _a.basePath, children = _a.children, linkType = _a.linkType, rest = __rest(_a, ["classes", "className", "ids", "data", "loaded", "resource", "basePath", "children", "linkType"]);
    var classes = useStyles({ classes: classesOverride });
    if (loaded === false) {
        return React.createElement(LinearProgress, null);
    }
    return (React.createElement("div", __assign({ className: classnames(classes.root, className) }, sanitizeRestProps(rest)), ids.map(function (id) {
        var resourceLinkPath = !linkType
            ? false
            : linkToRecord(basePath, id, linkType);
        if (resourceLinkPath) {
            return (React.createElement(Link, { className: classes.link, key: id, to: resourceLinkPath, onClick: stopPropagation }, cloneElement(Children.only(children), {
                record: data[id],
                resource: resource,
                basePath: basePath,
                // Workaround to force ChipField to be clickable
                onClick: handleClick,
            })));
        }
        return cloneElement(Children.only(children), {
            key: id,
            record: data[id],
            resource: resource,
            basePath: basePath,
        });
    })));
}
SingleFieldList.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    ids: PropTypes.array,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    resource: PropTypes.string,
};
SingleFieldList.defaultProps = {
    classes: {},
    linkType: 'edit',
};
export default SingleFieldList;
