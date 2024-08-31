"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomFileName = void 0;
const path_1 = require("path");
const generateRandomFileName = (fieldname, originalname) => {
    const randomSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${fieldname}-${randomSuffix}-${(0, path_1.extname)(originalname)}`;
};
exports.generateRandomFileName = generateRandomFileName;
//# sourceMappingURL=files.js.map