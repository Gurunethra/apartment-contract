const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
phone: { type: String },
role: { type: String, enum: ['council','contractor'], required: true },
apartment: { type: String },
designation: { type: String },
password: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);