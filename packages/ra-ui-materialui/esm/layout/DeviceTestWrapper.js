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
import React from 'react';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
/**
 * Test utility to simulate a device form factor for server-side mediaQueries
 *
 * Do not use inside a browser.
 *
 * @example
 *
 * <DeviceTestWrapper width="sm">
 *     <MyResponsiveComponent />
 * <DeviceTestWrapper>
 */
var DeviceTestWrapper = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 'md' : _b, children = _a.children;
    var theme = createMuiTheme();
    // Use https://github.com/ericf/css-mediaquery as ponyfill.
    var ssrMatchMedia = function (query) { return ({
        matches: mediaQuery.match(query, {
            // The estimated CSS width of the browser.
            // For the sake of this demo, we are using a fixed value.
            // In production, you can look into client-hint https://caniuse.com/#search=client%20hint
            // or user-agent resolution.
            width: theme.breakpoints.width(width),
        }),
    }); };
    return (React.createElement(ThemeProvider, { theme: __assign(__assign({}, theme), { props: { MuiUseMediaQuery: { ssrMatchMedia: ssrMatchMedia } } }) }, children));
};
export default DeviceTestWrapper;
