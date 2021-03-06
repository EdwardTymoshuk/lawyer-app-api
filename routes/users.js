const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const verify = require('./verifyToken');

//REGISTRATION
router.post('/register', async (req, res) => {
    //validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already exists in the db
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email is already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    //validation
    const {error} = loginValidation(req.body.email);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already exists in the db
    const user = await User.findOne({email: req.body.email.email});
    if (!user) return res.status(400).send('Email or password is wrong');

    //checking if the password is correct
    const validPass = await bcrypt.compare(req.body.email.password, user.password);
    if(!validPass) return res.status(400).send('Email or password is wrong');

    //create and assing a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(user);
})

module.exports = router;