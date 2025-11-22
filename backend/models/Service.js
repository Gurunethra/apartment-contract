const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
apartment: String,
serviceType: String,
details: String,
status: { type: String, enum: ['open','assigned','closed'], default: 'open' },
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' }
}, { timestamps: true });


module.exports = mongoose.model('Service', ServiceSchema);