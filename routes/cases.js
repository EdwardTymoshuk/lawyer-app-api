const express = require('express');
const router = express.Router();
const Case = require('../models/Case');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
    try {
        const cases = await Case.find();
        res.json(cases)

    } catch(err){ 
        res.json({message: err})
    }
})
router.post('/', async (req, res) => {
    const post = new Case({
        nrRef: req.body.nrRef,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        dob: req.body.dob,
        adress: req.body.adress,
        description: req.body.description
    });
    try{
    const item = await post.save();
    res.json(item);
    }catch(err){
        res.json({message: err})
    }
});
router.get('/:id', async (req, res) => {
    try {
    const item = await Case.findById(req.params.id);
    res.json(item)
    } catch(err) {
        res.json({message: err});
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Case.remove({_id: req.params.id});
        res.sendStatus(200);
    } catch(err) {
        res.json({message: err});
    }
})
router.patch('/:id', async (req, res) => {
    try {
        await Case.updateOne({_id: req.params.id}, 
            {$set: {title: req.body.title}});
        res.sendStatus(200);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;