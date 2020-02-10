import lodashMemoize from 'lodash/memoize';
/* eslint-disable no-underscore-dangle */
/* @link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
var isEmpty = function (value) {
    return typeof value === 'undefined' ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
};
var getMessage = function (message, messageArgs, value, values) {
    return typeof message === 'function'
        ? message({
            args: messageArgs,
            value: value,
            values: values,
        })
        : messageArgs
            ? {
                message: message,
                args: messageArgs,
            }
            : message;
};
// If we define validation functions directly in JSX, it will
// result in a new function at every render, and then trigger infinite re-render.
// Hence, we memoize every built-in validator to prevent a "Maximum call stack" error.
var memoize = function (fn) {
    return lodashMemoize(fn, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return JSON.stringify(args);
    });
};
// Compose multiple validators into a single one for use with final-form
export var composeValidators = function () {
    var validators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i] = arguments[_i];
    }
    return function (value, values, meta) {
        var allValidators = Array.isArray(validators[0])
            ? validators[0]
            : validators;
        return allValidators.reduce(function (error, validator) {
            return error ||
                (typeof validator === 'function' && validator(value, values, meta));
        }, undefined);
    };
};
/**
 * Required validator
 *
 * Returns an error if the value is null, undefined, or empty
 *
 * @param {string|function} message
 *
 * @example
 *
 * const titleValidators = [required('The title is required')];
 * <TextInput name="title" validate={titleValidators} />
 */
export var required = memoize(function (message) {
    if (message === void 0) { message = 'ra.validation.required'; }
    return Object.assign(function (value, values) {
        return isEmpty(value)
            ? getMessage(message, undefined, value, values)
            : undefined;
    }, { isRequired: true });
});
/**
 * Minimum length validator
 *
 * Returns an error if the value has a length less than the parameter
 *
 * @param {integer} min
 * @param {string|function} message
 *
 * @example
 *
 * const passwordValidators = [minLength(10, 'Should be at least 10 characters')];
 * <TextInput type="password" name="password" validate={passwordValidators} />
 */
export var minLength = memoize(function (min, message) {
    if (message === void 0) { message = 'ra.validation.minLength'; }
    return function (value, values) {
        return !isEmpty(value) && value.length < min
            ? getMessage(message, { min: min }, value, values)
            : undefined;
    };
});
/**
 * Maximum length validator
 *
 * Returns an error if the value has a length higher than the parameter
 *
 * @param {integer} max
 * @param {string|function} message
 *
 * @example
 *
 * const nameValidators = [maxLength(10, 'Should be at most 10 characters')];
 * <TextInput name="name" validate={nameValidators} />
 */
export var maxLength = memoize(function (max, message) {
    if (message === void 0) { message = 'ra.validation.maxLength'; }
    return function (value, values) {
        return !isEmpty(value) && value.length > max
            ? getMessage(message, { max: max }, value, values)
            : undefined;
    };
});
/**
 * Minimum validator
 *
 * Returns an error if the value is less than the parameter
 *
 * @param {integer} min
 * @param {string|function} message
 *
 * @example
 *
 * const fooValidators = [minValue(5, 'Should be more than 5')];
 * <NumberInput name="foo" validate={fooValidators} />
 */
export var minValue = memoize(function (min, message) {
    if (message === void 0) { message = 'ra.validation.minValue'; }
    return function (value, values) {
        return !isEmpty(value) && value < min
            ? getMessage(message, { min: min }, value, values)
            : undefined;
    };
});
/**
 * Maximum validator
 *
 * Returns an error if the value is higher than the parameter
 *
 * @param {integer} max
 * @param {string|function} message
 *
 * @example
 *
 * const fooValidators = [maxValue(10, 'Should be less than 10')];
 * <NumberInput name="foo" validate={fooValidators} />
 */
export var maxValue = memoize(function (max, message) {
    if (message === void 0) { message = 'ra.validation.maxValue'; }
    return function (value, values) {
        return !isEmpty(value) && value > max
            ? getMessage(message, { max: max }, value, values)
            : undefined;
    };
});
/**
 * Number validator
 *
 * Returns an error if the value is not a number
 *
 * @param {string|function} message
 *
 * @example
 *
 * const ageValidators = [number('Must be a number')];
 * <TextInput name="age" validate={ageValidators} />
 */
export var number = memoize(function (message) {
    if (message === void 0) { message = 'ra.validation.number'; }
    return function (value, values) {
        return !isEmpty(value) && isNaN(Number(value))
            ? getMessage(message, undefined, value, values)
            : undefined;
    };
});
/**
 * Regular expression validator
 *
 * Returns an error if the value does not match the pattern given as parameter
 *
 * @param {RegExp} pattern
 * @param {string|function} message
 *
 * @example
 *
 * const zipValidators = [regex(/^\d{5}(?:[-\s]\d{4})?$/, 'Must be a zip code')];
 * <TextInput name="zip" validate={zipValidators} />
 */
export var regex = lodashMemoize(function (pattern, message) {
    if (message === void 0) { message = 'ra.validation.regex'; }
    return function (value, values) {
        return !isEmpty(value) && typeof value === 'string' && !pattern.test(value)
            ? getMessage(message, { pattern: pattern }, value, values)
            : undefined;
    };
}, function (pattern, message) {
    return pattern.toString() + message;
});
/**
 * Email validator
 *
 * Returns an error if the value is not a valid email
 *
 * @param {string|function} message
 *
 * @example
 *
 * const emailValidators = [email('Must be an email')];
 * <TextInput name="email" validate={emailValidators} />
 */
export var email = memoize(function (message) {
    if (message === void 0) { message = 'ra.validation.email'; }
    return regex(EMAIL_REGEX, message);
});
var oneOfTypeMessage = function (_a) {
    var args = _a.args;
    return ({
        message: 'ra.validation.oneOf',
        args: args,
    });
};
/**
 * Choices validator
 *
 * Returns an error if the value is not among the list passed as parameter
 *
 * @param {array} list
 * @param {string|function} message
 *
 * @example
 *
 * const genderValidators = [choices(['male', 'female'], 'Must be either Male or Female')];
 * <TextInput name="gender" validate={genderValidators} />
 */
export var choices = memoize(function (list, message) {
    if (message === void 0) { message = oneOfTypeMessage; }
    return function (value, values) {
        return !isEmpty(value) && list.indexOf(value) === -1
            ? getMessage(message, { list: list }, value, values)
            : undefined;
    };
});
