"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TranslationContext = react_1.createContext({
    locale: 'en',
    setLocale: function () { return Promise.resolve(); },
    i18nProvider: {
        translate: function (x) { return x; },
        changeLocale: function () { return Promise.resolve(); },
        getLocale: function () { return 'en'; },
    },
});
exports.TranslationContext = TranslationContext;
TranslationContext.displayName = 'TranslationContext';
