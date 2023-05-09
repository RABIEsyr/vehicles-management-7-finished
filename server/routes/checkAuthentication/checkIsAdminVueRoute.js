const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

router.post('/', async function(req, res) {
    var isAuth;
    try {
        const token = req.body.token;
        console.log('token0', token);
        if (!token) {
            res.json({
                success: false,
                message: 'send a token please...'
            })
        } else {
          isAuth = isAuthenticated(token);
            if (isAuth) {
                var decToken = decodeToken(token);
                if (decToken.role == 'admin') {
                    console.log('valid token222', decToken);
                    res.json({
                        success: true,
                        message: 'authenticated done true'
                    })
                } else {
                    res.json({
                        success: false,
                        message: 'you are not admin'
                })
                }

            } else {
                res.json({
                    success: false,
                    message: 'token not valid'
            })
          }
        }
    } catch (error) {
        res.json({
            success: false,
            message: 'internal error 10001'
        })
    }
})


function isAuthenticated(token) {
    var status;
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            status = false;
        } else {
            status = true;
        }
    });
    return status;
}

function decodeToken(token) {
    var dT;
    try {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
               throw err;
            } else {
                dT = decoded;
            }
        });
    } catch (error) {
        
    }
    return dT;
}

module.exports = router;