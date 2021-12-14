const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
 teachersname: {
  type: String,
  required: true
 },
 subject: {
  type: String,
  required: true
 }
})

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;