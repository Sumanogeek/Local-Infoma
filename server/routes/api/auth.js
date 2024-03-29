const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

//@route POST api/auth
//@desc create user
//@access Public
router.post('/', (req, res) => {
    const { email, password} = req.body;

    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Enter all values'});
    }

    //check for existing user
    User.findOne({email})
        .then (user => {if (!user) 
            {return res.status(400).json({ msg: 'User dose not exist'})}

        //Compare password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                jwt.sign( 
                    { id: user.id},
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                );
        });
    });
});

//@route get api/auth/user
//@desc get user token
//@access Private
//router.get('/user', auth, (req, res) => {
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user =>  res.json(user));
        //.then(user =>  console.log("get user token: " + res));
});

module.exports = router;