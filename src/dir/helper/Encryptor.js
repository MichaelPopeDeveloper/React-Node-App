"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
exports.encryptPassword = function (password) {
    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};
exports.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};
//# sourceMappingURL=Encryptor.js.map