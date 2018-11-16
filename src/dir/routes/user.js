"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import * as jwt from 'jsonwebtoken';
var crypto = require("crypto");
var User_1 = require("../models/User");
var encryptor = require("../helper/Encryptor");
var tokenHelper = require("../helper/JWT");
var router = express.Router();
exports.userRoute = router
    .get('/', function (req, res) {
    res.send('User Home Page');
})
    .get('/profile', function (req, res) {
    var name = req.body.name /*email, notes*/;
    User_1.user.findOne({ name: name })
        .then(function (user) {
        if (!user) {
            res.send('There is no user with those credentials').status(501);
        }
        else {
            var name_1 = user.name, email = user.email, notes = user.notes;
            var token = tokenHelper.signToken({ name: name_1, email: email, notes: notes });
            res.send(token);
        }
    });
    // User profile that shoes notes
    res.send({ msg: 'profile' });
})
    .post('/signUp', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    var encryptedPassword = encryptor.encryptPassword(password);
    var newUser = new User_1.user({
        name: name,
        email: email,
        password: encryptedPassword,
        notes: [],
    });
    newUser.save()
        .then(function (result) {
        if (!result) {
            res.send('A user with that email already exists....');
        }
        else {
            var name_2 = result.name, email_1 = result.email, notes = result.notes;
            var token = tokenHelper.signToken({ name: name_2, email: email_1, notes: notes });
            res.send(token);
        }
        console.log(result);
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
})
    .post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, dbUser, notes, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                console.log({ email: email, password: password });
                return [4 /*yield*/, User_1.user.findOne({ email: email }).catch(function (err) { return res.send(err); })];
            case 1:
                dbUser = _b.sent();
                if (!dbUser) {
                    res.send('No user with that username exists...').status(403);
                }
                notes = dbUser.notes;
                if (encryptor.comparePassword(password, dbUser.password)) {
                    token = tokenHelper.signToken({ email: email, notes: notes });
                    res.send({ token: token, authenticated: true });
                }
                else {
                    res.send({ msg: 'invalid credentials', authenticated: false }).status(403);
                }
                return [2 /*return*/];
        }
    });
}); })
    .post('/createNote', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, decodedToken, email, note, dbUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                decodedToken = tokenHelper.decodeToken(token);
                email = decodedToken.email, note = decodedToken.note;
                if (!(decodedToken.exp < Date.now() / 1000)) return [3 /*break*/, 1];
                res.send('Token is expired').status(403);
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, User_1.user.findOne({ email: email }).catch(function (err) { return res.send(err); })];
            case 2:
                dbUser = _a.sent();
                if (!dbUser) {
                    res.send('No user with that email exists...').status(403);
                }
                else {
                    // Give note an id for retrieval
                    note.id = crypto.randomBytes(64).toString('hex');
                    User_1.user.findOneAndUpdate({ email: email }, { $push: { notes: note } })
                        .then(function (result) { return res.send(result); })
                        .catch(function (err) { return res.send(err); });
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .delete('/deleteNote', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, decodedToken, email, note, dbUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                decodedToken = tokenHelper.decodeToken(token);
                email = decodedToken.email, note = decodedToken.note;
                if (!(decodedToken.exp < Date.now() / 1000)) return [3 /*break*/, 1];
                res.send('Token is expired').status(403);
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, User_1.user.findOne({ email: email }).catch(function (err) { return res.send(err); })];
            case 2:
                dbUser = _a.sent();
                if (!dbUser) {
                    res.send('No user with that email exists...').status(403);
                }
                else {
                    User_1.user.findOneAndUpdate({ email: email }, { $push: { notes: note } })
                        .then(function (result) { return res.send(result); })
                        .catch(function (err) { return res.send(err); });
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=user.js.map