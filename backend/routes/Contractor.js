const express = require('express');
const multer = require('multer');
const Contractor = require('../models/Contractor');


const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// create contractor profile
router.post('/', upload.array('photos',5), async (req,res) => {
try{
const { companyName, skills, experienceYears, licenseNumber, phone, email, location, createdBy } = req.body;
const photos = (req.files || []).map(f => `/uploads/${f.filename}`);
const c = new Contractor({ companyName, skills: skills? skills.split(',') : [], experienceYears, licenseNumber, phone, email, location, photos, createdBy });
await c.save();
res.json(c);
}catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});


// list/search
router.get('/', async (req,res) => {
try{
const { q, skill, location } = req.query;
const filter = {};
if(skill) filter.skills = { $in: [skill] };
if(location) filter.location = new RegExp(location,'i');
if(q) filter.companyName = new RegExp(q,'i');
const list = await Contractor.find(filter).limit(50);
res.json(list);
}catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});


module.exports = router;