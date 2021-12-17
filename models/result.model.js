const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const resultSchema = new Schema({
 studentname: {
  type: String,
  required: true,
  trim: true
 },
 studentfullname: {
 type: String,
 required: true
 },
 studentclass: {
  type: String,
  required: true
 },
 subject: {
  type: String,
  required: true,
  trim: true
 },
 test: {
  type: Number,
  required: true
 },
 exam: {
  type: Number,
  required: true
 },
 resultdate: {
  type: Date,
  required: true
 },
 responsible: {
  type: String,
  required: true
 },
}, {
 timestamps: true,
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;