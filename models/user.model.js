import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 email: {
  type: String,
  required: true,
  lowercase: true
 },
 passwordHash: {
  type: String,
  required: true
 }
});

const User = mongoose.model("user", userSchema);

module.exports = User;