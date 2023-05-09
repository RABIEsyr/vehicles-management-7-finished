const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

router.get('/', checkAuth, async (req, res) => {
    const currentYear = new Date().getFullYear();

        try {
            const result = await db.IncomingSchema.aggregate(
                [
                    {
                        $match: {
                               year: currentYear
                        }
                     },
                     {
                       $group: {_id: null,
                                "max": {
                                   $max: '$serialNumber'
                                 }
                               }
                      },
                ]
                );
                let max = result[0].max + 1;
                console.log('max max', max)
                res.json({
                    success: true,
                    max: max
                });
        } catch (error) {
            res.json({
                success: false,
                message: 'internal error 1455'
            });
        }
        
});

module.exports = router;