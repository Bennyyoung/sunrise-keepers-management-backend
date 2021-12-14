const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const staffSchema = new Schema({
 firstname: {
  type: String,
  required: [true, "Please provide your first name"],
  trim: true,
  minlength: 2
 },
 lastname: {
  type: String,
  require: [true, "Please provide your last name"],
  trim: true,
  minlength: 2
 },
 email: {
  type: String,
  required: [true, "Please provide an email"],
  trim: true,
  minlength: 2,
  // unique: true,

  match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
   "Please provide a valid email"]
 },
 joiningdate: {
  type: Date,
  required: true
 },
 password: {
  type: String,
  required: true,
  trim: true,
  minlength: 6,
  select: false
 },
 confirmpassword: {
  type: String,
  required: true,
  trim: true,
  minlength: 6,
  select: false
 },
 mobilenumber: {
  type: Number,
  required: true,
  trim: true,
  minlength: 2
 },
 gender: {
  type: String,
  required: true,
 },
 designation: {
  type: String,
  required: true,
  trim: true
 },
 dateofbirth: {
  type: Date,
  required: true,
 },
 education: {
  type: String,
  required: true,
  trim: true
 }

}, {
 timestamps: true,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;