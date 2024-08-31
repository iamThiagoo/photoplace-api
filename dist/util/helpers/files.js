"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHashByString = exports.generateRandomFileName = void 0;
const path_1 = require("path");
const generateRandomFileName = (fieldname, originalname) => {
    const randomSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${fieldname}-${randomSuffix}-${(0, path_1.extname)(originalname)}`;
};
exports.generateRandomFileName = generateRandomFileName;
const generateHashByString = async (myString) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(myString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};
exports.generateHashByString = generateHashByString;
//# sourceMappingURL=files.js.map