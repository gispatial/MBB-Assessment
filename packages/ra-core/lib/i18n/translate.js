"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var warning_1 = __importDefault(require("../util/warning"));
var useTranslate_1 = __importDefault(require("./useTranslate"));
var useLocale_1 = __importDefault(require("./useLocale"));
/**
 * Higher-Order Component for getting access to the `locale` and the `translate` function in props.
 *
 * Requires that the app is decorated by the <TranslationProvider> to inject
 * the translation dictionaries and function in the context.
 *
 * @example
 *     import React from 'react';
 *     import { translate } from 'react-admin';
 *
 *     const MyHelloButton = ({ translate }) => (
 *         <button>{translate('myroot.hello.world')}</button>
 *     );
 *
 *     export default translate(MyHelloButton);
 *
 * @param {*} BaseComponent The component to decorate
 */
var withTranslate = function (BaseComponent) {
    warning_1.default(typeof BaseComponent === 'string', "The translate function is a Higher Order Component, and should not be called directly with a translation key. Use the translate function passed as prop to your component props instead:\n\nconst MyHelloButton = ({ translate }) => (\n    <button>{translate('myroot.hello.world')}</button>\n);");
    var TranslatedComponent = function (props) {
        var translate = useTranslate_1.default();
        var locale = useLocale_1.default();
        return (react_1.default.createElement(BaseComponent, __assign({}, props, { translate: translate, locale: locale })));
    };
    TranslatedComponent.defaultProps = BaseComponent.defaultProps;
    return TranslatedComponent;
};
exports.default = withTranslate;
