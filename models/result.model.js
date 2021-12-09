const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
 studentname: {
  type: String,
  required: true,
  trim: true
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
 classtest: {
  type: Number,
  required: true
 },
 midtermtest: {
  type: Number,
  required: true
 },
 midtermtotal: {
  type: Number,
  required: true
 },
 exam: {
  type: Number,
  required: true
 },
 examtotal: {
  type: Number,
  required: true
 },
 average: {
  type: Number,
  required: true
 },
 position: {
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