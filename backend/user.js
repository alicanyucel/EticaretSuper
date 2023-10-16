const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
    createdDateww: Date
});
const User = mongoose.model("User", userSchema);
module.exports = User;
