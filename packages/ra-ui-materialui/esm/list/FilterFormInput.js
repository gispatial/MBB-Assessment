import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ActionHide from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useTranslate } from 'ra-core';
var emptyRecord = {};
var useStyles = makeStyles(function (theme) { return ({
    body: { display: 'flex', alignItems: 'flex-end' },
    spacer: { width: theme.spacing(2) },
    hideButton: {},
}); }, { name: 'RaFilterFormInput' });
var FilterFormInput = function (_a) {
    var filterElement = _a.filterElement, handleHide = _a.handleHide, classesOverride = _a.classes, resource = _a.resource, variant = _a.variant, margin = _a.margin;
    var translate = useTranslate();
    var classes = useStyles({ classes: classesOverride });
    return (React.createElement("div", { "data-source": filterElement.props.source, className: classnames('filter-field', classes.body) },
        !filterElement.props.alwaysOn && (React.createElement(IconButton, { className: classnames('hide-filter', classes.hideButton), onClick: handleHide, "data-key": filterElement.props.source, title: translate('ra.action.remove_filter') },
            React.createElement(ActionHide, null))),
        React.cloneElement(filterElement, {
            allowEmpty: true,
            resource: resource,
            record: emptyRecord,
            variant: variant,
            margin: margin,
            helperText: false,
        }),
        React.createElement("div", { className: classes.spacer }, "\u00A0")));
};
FilterFormInput.propTypes = {
    filterElement: PropTypes.node,
    handleHide: PropTypes.func,
    classes: PropTypes.object,
    resource: PropTypes.string,
};
export default FilterFormInput;
