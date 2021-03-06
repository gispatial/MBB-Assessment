"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = require("faker/locale/en");
var utils_1 = require("./utils");
exports.default = (function (db) {
    var id = 0;
    return db.categories.reduce(function (acc, category) { return __spreadArrays(acc, Array.from(Array(10).keys()).map(function (index) {
        var width = utils_1.randomFloat(10, 40);
        var height = utils_1.randomFloat(10, 40);
        return {
            id: id++,
            category_id: category.id,
            reference: category.name.substr(0, 2) +
                '-' +
                en_1.random.alphaNumeric(5) +
                '-' +
                en_1.random.arrayElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            width: width,
            height: height,
            price: utils_1.randomFloat((width * height) / 20, (width * height) / 15),
            thumbnail: 'https://marmelab.com/posters/' +
                category.name +
                '-' +
                (index + 1) +
                '.jpeg',
            image: 'https://marmelab.com/posters/' +
                category.name +
                '-' +
                (index + 1) +
                '.jpeg',
            description: en_1.lorem.paragraph(),
            stock: utils_1.weightedBoolean(20)
                ? 0
                : en_1.random.number({ min: 0, max: 250 }),
        };
    })); }, []);
});
