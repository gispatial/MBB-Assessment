import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { FieldTitle } from 'ra-core';
var FilterButtonMenuItem = forwardRef(function (_a, ref) {
    var filter = _a.filter, onShow = _a.onShow, resource = _a.resource;
    var handleShow = useCallback(function () {
        onShow({ source: filter.source, defaultValue: filter.defaultValue });
    }, [filter.defaultValue, filter.source, onShow]);
    return (React.createElement(MenuItem, { className: "new-filter-item", "data-key": filter.source, "data-default-value": filter.defaultValue, key: filter.source, onClick: handleShow, ref: ref },
        React.createElement(FieldTitle, { label: filter.label, source: filter.source, resource: resource })));
});
FilterButtonMenuItem.propTypes = {
    filter: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
};
export default FilterButtonMenuItem;
