const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
const path = require('path')

const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

DIR = "uploads";


// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//       cb(null, 'req.decoded.user._id' + ".PNG");
//     },
//   });
//   let upload = multer({ storage: storage });

router.post('/get-no-edit', checkAuth, (req, res) => {
  const serial = req.body.serial;
  const date = req.body.date;
  console.log('serial:', serial, 'date: ', date)

  if (serial && date) {
    try {
      db.IncomingSchema.findOne({ year: date, serialNumber: serial })
        .populate('sender')
        .exec(async (err, doc) => {

          console.log('doc', doc);
          let folder = DIR + '/' + doc._id + '/' + doc.sender._id;
          console.log('folder', folder)
          getAllFiles(folder, function (err, files) {
            console.log('rr', files);

            res.json({
              doc,
              files
            })
          });

        })
      // .catch((e) => {
      //   console.log('err0', e)
      //   res.json({
      //     success: false,
      //     message: 'database error 009009'
      //   })
      // })
    } catch (error) {
      console.log('err1', error)
      res.json({
        success: false,
        message: 'internal error 009009'
      })
    }
  } else {
    res.json({
      success: false,
      message: 'enter serial and date'
    })
  }
});

router.post('/edit', checkAuth, (req, res) => {
  // const length = req.body.payload.length
  // console.log('req.body.payload', req.body.payload.length);
  // if (length > 0) {
  //     for (let index = 0; index < length; index++) {
  //     fs.writeFileSync(path.join(DIR, `${index}.jpg`), new Buffer.from(req.body.payload[index].replace(/^data:image\/\w+;base64,/, ""), 'base64'));
  //     }
  //  }

  const serialNumber = req.body.serialNumber
  const date = req.body.date;
  const messageNumber = req.body.messageNumber;
  const conclusion = req.body.conclusion;
  const result = req.body.result;
  const author = req.decoded.user.id;
  const year = new Date(date).getFullYear();
  var imgListLength;
 try {
   imgListLength = req.body.images.length
 } catch (error) {
  console.log('errToSd', error)
 }
  console.log('new incoming editing', serialNumber, messageNumber, conclusion, result, year, 'imgListLength', imgListLength)

  db.IncomingSchema.findOneAndUpdate({ serialNumber, year }, { "$set": { "conclusion": conclusion, "result": result } }, (err, d) => {
    if (err) {
      res.json({
        success: false,
        message: 'internal database error'
      })
    } else {
      let folder = DIR + '/' + d._id + '/' + d.sender;
    
      if (imgListLength && imgListLength > 0) {
        const fileState = getMaxFiles(folder)
          var lastMax = fileState + 1;
            for (let index = 0; index < imgListLength; index++) {
                fs.writeFileSync(path.join(folder, `${index + lastMax}.jpg`), new Buffer.from(req.body.images[index].replace(/^data:image\/\w+;base64,/, ""), 'base64'));
            }      
      }
      res.json({
        success: true,
        message: 'message edited'
      })
    }
  })


});

async function getAllFiles(dir, callback) {
  var filesList = [];
  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };
  fs.readdir(dir, function (err, files) {
    if (err) {
      return callback(err)
    }
    try {
      files.forEach((file) => {
        console.log('file', path.parse(file).name)
        filesList.push(parseInt(path.parse(file).name))
      })
      // var max = filesList.max()
      callback(null, filesList)
    } catch (error) {
      callback(error)
    }
  })
}


function getMaxFiles(dir) {
  var filesList = [];
  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };
  var files = fs.readdirSync(dir);
  console.log('files of', files)
  console.log('files of2', files.length)
   if (files.length == 0) {
    return 0;
   } else {
    files.forEach((file) => {
      filesList.push(parseInt(path.parse(file).name))
    })
    const max = filesList.max();
    return max;
   }

  
}

module.exports = router;

