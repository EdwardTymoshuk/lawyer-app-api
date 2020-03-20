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

module.exports = router;