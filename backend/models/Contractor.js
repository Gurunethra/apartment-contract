const mongoose = require('mongoose');


const ContractorSchema = new mongoose.Schema({
companyName: { type: String, required: true },
skills: [String],
experienceYears: Number,
licenseNumber: String,
phone: String,
email: String,
location: String,
photos: [String],
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports = mongoose.model('Contractor', ContractorSchema);