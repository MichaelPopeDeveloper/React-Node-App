"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var secret = 'mySecret';
exports.signToken = function (data) {
    var token = jwt.sign(data, secret, { expiresIn: '1h' });
    return token;
};
exports.decodeToken = function (token) {
    var decodedToken = jwt.verify(token, secret, function (err, decodedToken) {
        if (err) {
            return { isValid: false, msg: 'token has expired', exp: 0 };
        }
        return decodedToken;
    });
    return decodedToken;
};
//# sourceMappingURL=JWT.js.map