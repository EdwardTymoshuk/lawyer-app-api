const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

router.get('/:id', async (req, res) => {
    try {
    const item = await Case.findById(req.params.id);
    res.json(item)
    } catch(err) {
        res.json({message: err});
    }
});
router.post('/', async (req, res) => {
    const caseElement = req.body.nrRef;
    try{
    const item = await post.save();
    res.json(item);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router;