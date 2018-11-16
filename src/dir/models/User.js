"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [{
            id: {
                type: String,
                required: false,
                unique: true,
            },
            title: {
                type: String,
                required: false,
            },
            body: {
                type: String,
                required: false,
            },
            created_at: {
                type: Date,
                required: true,
            },
            updated_at: {
                type: Date,
                required: true,
            },
        }],
});
exports.user = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map