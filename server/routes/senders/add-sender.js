const express = require('express');
const router = express.Router();

const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

router.post('/',checkAuth, async (req, res) => {
    try {
        const name = req.body.name;
        if (name) {
            const res2 = await db.SendersSchema.findOne({name: name});
            console.log('res of sender', res2);
            if (res2 == null) {
                const newSender = new db.SendersSchema();
                newSender.name = name;
                newSender.save()
                    .then((doc) => {
                        res.json({
                           success: true 
                        });
                    })
                    .catch((err) => {
                        res.json({
                            success: false,
                            message: 'internal error 345'
                         });
                    })
            } else {
                res.json({
                    success: false,
                    message: 'name of sender already exists' 
                 });
            }
            
        }
    } catch (error) {
        res.json({
            success: false 
         });
    }

});

module.exports = router;