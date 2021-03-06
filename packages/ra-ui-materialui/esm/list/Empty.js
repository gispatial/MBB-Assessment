import React from 'react';
import Inbox from '@material-ui/icons/Inbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { useTranslate } from 'ra-core';
import { CreateButton } from '../button';
import inflection from 'inflection';
var useStyles = makeStyles({
    message: {
        textAlign: 'center',
        opacity: 0.5,
        margin: '0 1em',
    },
    icon: {
        width: '9em',
        height: '9em',
    },
    toolbar: {
        textAlign: 'center',
        marginTop: '2em',
    },
}, { name: 'RaEmpty' });
var Empty = function (_a) {
    var resource = _a.resource, basePath = _a.basePath;
    var classes = useStyles();
    var translate = useTranslate();
    var resourceName = inflection.humanize(translate("resources." + resource + ".name", {
        smart_count: 0,
        _: inflection.pluralize(resource),
    }), true);
    var emptyMessage = translate('ra.page.empty', { name: resourceName });
    var inviteMessage = translate('ra.page.invite');
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.message },
            React.createElement(Inbox, { className: classes.icon }),
            React.createElement(Typography, { variant: "h4", paragraph: true }, translate("resources." + resource + ".empty", {
                _: emptyMessage,
            })),
            React.createElement(Typography, { variant: "body1" }, translate("resources." + resource + ".invite", {
                _: inviteMessage,
            }))),
        React.createElement("div", { className: classes.toolbar },
            React.createElement(CreateButton, { variant: "contained", basePath: basePath }))));
};
export default Empty;
