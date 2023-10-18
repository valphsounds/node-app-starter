// xobj - Express DB Object MongoDB routes
// xobjmem - Express DB Object member
const auth = require('../middleware/auth');
const {Object, validate} = require('../models/dbObj');
const express = require('express');
const router = express.Router();
const bp = require('body-parser');

router.use(bp.urlencoded({ extended: false }));
router.use(bp.json());

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', async (req, res) => {
    const object = await Object.find();
    res.send(object);
});

router.post('/', auth, async (req, res) => {
    // 400
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const object = new Object({
        num: req.body.num,
        string: req.body.string,
        bool: req.body.bool
    });

    await object.save();

    res.send(object);
});

router.put('/:id', auth, async (req, res) => {
    // 400
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const object = await Object.findByIdAndUpdate(req.params.id, {
        num: req.body.num,
        string: req.body.string,
        bool: req.body.bool
    }, {
        new: true
    });

    //404
    if(!object) return res.status(404).send('No such object');

    res.send(object);
});

router.delete('/:id', auth, async (req, res) => {
    const object = await Object.findByIdAndRemove(req.params.id);
    //404
    if(!object) return res.status(404).send('No such object');

    res.send(object);
});

router.get('/:id', auth, async (req, res) => {
    const object = await Object.findById(req.params.id);
    //404
    if(!object) return res.status(404).send('No such object');

    res.send(object);
});

module.exports = router;