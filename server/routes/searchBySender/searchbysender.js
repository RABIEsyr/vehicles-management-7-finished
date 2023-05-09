const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')

const checkAuth = require('../../middleware/checkAuth');
const db = require('../../db/db');

var DIR = "uploads";

router.post('/', checkAuth, (req, res) => {
    const senderId = req.body.senderID;
    const year = req.body.year;
   
    if (senderId && year) {
        console.log('zzzxx', senderId,  '/', year)
        try {
            db.IncomingSchema.find({ sender: senderId, year: year })
            .populate('sender author')
            .sort({$natural:-1})
            .lean()
            .exec(async(err, docs) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'internal error 12233X'
                    });
                    throw err;
                }
                if (!docs.length) {
                    res.json({
                        success: false,
                        message: 'no results found'
                    })
                } else {
                    // var n = [];
                    // for (let i = 0; i < docs.length; i++) {
                    //     n.push(JSON.parse(docs[i]));
                    // }
                    console.log('msgvvv', docs)
                     docs.map((msg) => {
                        
                        // getAllFilesForEverSender(msg._id, msg.sender, function(err, filesL) {
                        //     console.log('fileListSender', filesL)
                        //     msg.files = filesL
                        //     console.log('msmmmm', docs);
                        // })
                       msg.files = getAllFilesForEverSenderS(msg._id, msg.sender._id)
                    })
                    res.json({
                        success: true,
                        docs
                    })
                    console.log('have found', docs);
                }
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'internal error 1223344X'
            })
        }
    }
});

 function getAllFilesForEverSender(msgid, senderId, callback) {
    var filesList = [];
    let folder = DIR + '/' + msgid + '/' + senderId;
    fs.readdir(folder, function (err, files) {
        if (err) {
            return callback(err)
        }
        try {
            files.forEach((file) => {
                // console.log('file0011', path.parse(file).name)
                filesList.push(parseInt(path.parse(file).name))
            })
            callback(null, filesList)
        } catch (error) {
            callback(error)
        }
    })
}
function getAllFilesForEverSenderS(msgid, senderId) {
    var filesList = [];
    let folder = DIR + '/' + msgid + '/' + senderId;
   try {
    console.log('folderr', folder)
    var fl = fs.readdirSync(folder);
    console.log('flfl', fl)
    if (fl) {
     fl.forEach((file) => {
         // console.log('file0011', path.parse(file).name)
         filesList.push(parseInt(path.parse(file).name))
     })
   } 
}catch (error) {
    
   }

    return filesList
}


module.exports = router;