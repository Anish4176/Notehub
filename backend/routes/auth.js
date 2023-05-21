const express = require('express');
const route = express.Router();
const User = require('../model/user')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secretkey = 'anishisagoodboy';

//ROUTE-1 :create a user by POST method at endpoint ( /api/auth/createuser )
route.post('/createuser', [
    body('name', "Enter a valid name").trim().isLength({ min: 3 }),
    body('email', "Enter a valid email").trim().isEmail()
], async (req, res) => {
    try {
        let success=false;
        //validating the dupicate email address
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success,error:'Email address already exists'})
        }
        // validating the other fields 
        const result = validationResult(req);
        if (result.isEmpty()) {
            const hashpassword = await bcrypt.hash(req.body.password, saltRounds);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword
            })
            success=true;

            //generating token
            const token = jwt.sign({ id: user._id }, secretkey);

            //saving the data in db
            const saveuser = await user.save();
            return res.status(200).json({success,token});
        }
        // Handling invalid validation result
        res.json({success, errors: 'Please Enter a valid value' });
    }
    catch (err) {
        console.log('Some Error occurred in post request');
        console.log(err);
        res.status(500).send('Something went wrong')
    }

});

//ROUTE 2:login user with endpoint ( /api/auth/login )
route.post('/login', [
    body('email', "Enter a valid email").trim().isEmail()
], async (req, res) => {
    try {
        let success=false;
        //validating the email address from database
        const validateemail = await User.findOne({ email: req.body.email })

        if (!validateemail) {
            return res.status(400).json({success,error:'Invalid credentials'})
        }

        // comparing password 
        const ismatch = await bcrypt.compare(req.body.password, validateemail.password);
        if (!ismatch) {
            return res.status(400).json({success,error:'Invalid credentials'})
        }
        //issuing jwt token
        const token = jwt.sign({ id: validateemail._id }, secretkey);
        success=true;
        res.status(200).json({success,token});

    }
    catch (err) {
        console.log('Some Error occurred in login ');
        console.log(err.messege);
        res.status(500).send('Something went wrong')
    }
});

//ROUTE-3 fetching user logged in details in endpoint ( /api/auth/fetchuser )
route.post('/fetchuser', fetchuser, async (req, res) => {
    try {
        //fetching id from req.user variable which i have created in fetchuser module
        const _id = req.user.id;
        //fetching user through his/her id
        const user = await User.findById(_id).select("-password")
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error occurred')
    }
})
module.exports = route;