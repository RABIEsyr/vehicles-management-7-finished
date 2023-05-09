const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const checkAuth = require('../../middleware/checkAuth');
const db = require('../../db/db');
const chechIsAdmin = require('../../middleware/chechIsAdmin');

router.post('/new-user', checkAuth, chechIsAdmin, async (req, res, next) => {
    let uname = req.body.username;
    
    const result = await db.UsersSchema.find({name: uname});
    if (uname) {
        if (result.length) {
            res.json({
                success: false,
                message: 'الاسم موجود مسبقا'
            });
        } else {
            const user = new db.UsersSchema();
            user.name = uname;
            user.password = '11111111';
    
            user.save((err, doc) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'internal error 1100'
                    });
                } else {
                    res.json({
                        success: true,
                        message: 'suuccefully added user',
                        userId: doc._id
                    });
                }
            });
        }
    }
});


// get username
router.get('/get-username', checkAuth, (req, res) => {
    const user = req.decoded.user;
    console.log('u1u1u1', user);
    if (user) {
        try {
           res.json(user.name) 
        } catch (error) {
                console.log('23e', error)
        }
    }
});

router.get('/get-all-users', checkAuth, chechIsAdmin, async(req, res) => {        
   try {
    const users = await db.UsersSchema.find({}).select('name');
    console.log('users ss', users)
    res.json({
        success: true,
        users
    });
   } catch (error) {
    res.json({
        success: false,
        message: 'internal error 110099'
    });
   }
});
module.exports = router;