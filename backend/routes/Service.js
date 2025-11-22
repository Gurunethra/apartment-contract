const express = require('express');
const Service = require('../models/Service');
const router = express.Router();
router.post('/', async (req,res) => {
try{
const s = new Service(req.body);
await s.save();
res.json(s);
}catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});
router.get('/', async (req,res) => {
try{
const { apartment } = req.query;
const q = apartment ? { apartment } : {};
const list = await Service.find(q).populate('requester').populate('assignedTo');
res.json(list);
}catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});


module.exports = router;