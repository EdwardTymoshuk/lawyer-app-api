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
    const caseElement = new Case({
        nrRef: req.body.nrRef,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        dob: req.body.dob,
        adress: req.body.adress,
        description: req.body.description
    });
    try{
    const savedCase = await caseElement.save();
    res.json(savedCase);
    }catch(err){
        rs.sendStatus(400);
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
        const updatedCase = await Case.updateOne({_id: req.params.id}, 
            {$set: {firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    dob: req.body.dob,
                    adress: req.body.adress,
                    description: req.body.description
                }});
        res.json(updatedCase);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;