const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const db = require('../../db/db');

// router.post('/log-in', (req, res) => {
//     username = req.body.username;
//     password = req.body.password
//     console.log(username, password)
//     if (username && password) {
//         console.log(username, password)
//         if (username == 'yousef' && password == '123') {
//             result = {username, password};
//             var token = jwt.sign(
//                 { user: result,  },
//                 config.secret,
//                 // {expiresIn: '30s'}
                
//             );
//             res.json({
//                 success: true,
//                 message: 'succefully Logged in',
//                 token: token
//             });        
//     }  else {
//         res.json({
//             success: false,
//             message: 'invalid username or password',
//         });   
//     }
      
//     }

// });

router.post('/log-in', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    console.log('ccc: ',username, password);
    if (username && password) {
        try {
        const doc = await db.UsersSchema.findOne({name: username, password: password});
            console.log(doc);
            if (doc) {
                if (doc.isAdmin) {
                    const token = jwt.sign(
                        { user: { id: doc._id, name: doc.name, admin: doc.isAdmin }, role: 'admin' },
                        config.secret
                    );
                    res.json({
                        success: true,
                        message: 'succefully Logged in',
                        token: token
                    });
                } else {
                    const token = jwt.sign(
                        { user: { id: doc._id, name: doc.name, admin: doc.isAdmin }, role: 'user' },
                        config.secret
                    );
                    res.json({
                        success: true,
                        message: 'succefully Logged in',
                        token: token
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'credentials not correct'
                });
            }
        } catch (error) {
            res.json({
                success: false,
                message: 'internal err 0011'
            });
        } 
    }
});


module.exports = router;