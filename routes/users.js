// xuser - Express User MongoDB routes
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const bp = require('body-parser');

router.use(bp.urlencoded({ extended: false }));
router.use(bp.json());

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    // 400
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['username', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'username']));
});

module.exports = router;