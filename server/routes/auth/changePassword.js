const express = require('express');
const router = express.Router();

const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

router.post('/change-password', checkAuth, (req, res) => {
    const oldpass = req.body.oldpass;
    const newpass = req.body.newpass;
    const userId = req.decoded.user.id
    console.log('oldpass: ', oldpass, 'newpass: ', newpass, 'userd', userId);
    if (oldpass && newpass) {
    try {
        db.UsersSchema.findById(userId, function(err, doc1) {
            try {
                if (err) {
                    throw err;
                } 
                if (doc1 == null) {
                    return;
                } else {
                    if (doc1.password === oldpass) {
                        db.UsersSchema.findOneAndUpdate({_id: userId}, {password: newpass}, function(err, doc) {
                            try {
                                if (err) {
                                    res.json({
                                        success: false,
                                        message: 'internal error at database, call the developer'
                                    });
                                    throw err;
                                } else {
                                    res.json({
                                        success: true,
                                        message: 'password changed'
                                    })
                                }
                            } catch (error) {
                                res.json({
                                    success: false,
                                    message: 'internal error, call the developer'
                                })
                            }
                        })
                    } else {
                        console.log('كلمة المرور لقديمة غير صحيحة')
                        res.json({
                            success: false,
                            message: 'كلمة المرور القديمة غير صحيحة'
                        })
                    }
                }
            } catch (error) {
                
            }
        });
        
    } catch (error) {
        console.log('eroop', error)
        res.json({
            sccess: false,
            message: 'error 455X'
        })
    }
}
});

module.exports = router;