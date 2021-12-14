const express = require('express');

const router = express.Router();
let Upload = require('../models/upload.model')
const multer = require('multer');

// Storage engine for multer
const storageEngine = multer.diskStorage({
 destination: './public/uploads/',
 filename: function (req, file, callback) {
  callback(
   null,
   file.fieldname + '-' + Date.now() + path.extname(file.originalname)
  );
 },
});

// File Filter for multer
const fileFilter = (req, file, callback) => {
 let pattern = /jpg|png|svg|docs/; //Regex

 if (pattern.test(path.extname(file.originalname))) {
  callback(null, true);
 } else {
  callback('Error: not a valid file')
 }
};

// Initialize multer
const upload = multer({
 stoage: storageEngine,
 fileFilter: fileFilter,
 limits: {
  fieldSize: 1024 * 1024 * 10,
 }
})

// Routing
// app.post('/upload', upload.single('uploadedFile'), (req, res) => {
//  res.json(req.file).status(200);
// })

router.route('/upload', upload.single('image')).post((req, res) => {
 const teachersname = req.body.teachersname;
 const subject = req.body.subject;
 const upload = req.file.filename;

 const newUpload = new Upload
 teachersname,
  subject,
  upload

 newUpload.save()
  .then(() => res.json('Assignment uploaded')).catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;