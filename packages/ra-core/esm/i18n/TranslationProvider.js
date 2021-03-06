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
import React, { useCallback, useMemo, Children, } from 'react';
import { useSafeSetState } from '../util/hooks';
import { TranslationContext } from './TranslationContext';
/**
 * Creates a translation context, available to its children
 *
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider i18nProvider={i18nProvider}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
var TranslationProvider = function (props) {
    var i18nProvider = props.i18nProvider, children = props.children;
    var _a = useSafeSetState({
        locale: i18nProvider ? i18nProvider.getLocale() : 'en',
        i18nProvider: i18nProvider,
    }), state = _a[0], setState = _a[1];
    var setLocale = useCallback(function (newLocale) {
        return setState({
            locale: newLocale,
            i18nProvider: i18nProvider,
        });
    }, [i18nProvider, setState]);
    // Allow locale modification by including setLocale in the context
    // This can't be done in the initial state because setState doesn't exist yet
    var value = useMemo(function () { return (__assign(__assign({}, state), { setLocale: setLocale })); }, [setLocale, state]);
    return (React.createElement(TranslationContext.Provider, { value: value }, Children.only(children)));
};
export default TranslationProvider;
