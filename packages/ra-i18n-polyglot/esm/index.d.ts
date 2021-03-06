import { I18nProvider } from 'ra-core';
declare type GetMessages = (locale: string) => Object;
declare const _default: (getMessages: GetMessages, initialLocale?: string, polyglotOptions?: any) => I18nProvider;
/**
 * Build a polyglot-based i18nProvider based on a function returning the messages for a locale
 *
 * @example
 *
 * import { Admin, Resource, polyglotI18nProvider } from 'react-admin';
 * import englishMessages from 'ra-language-english';
 * import frenchMessages from 'ra-language-french';
 *
 * const messages = {
 *     fr: frenchMessages,
 *     en: englishMessages,
 * };
 * const i18nProvider = polyglotI18nProvider(locale => messages[locale])
 */
export default _default;
