const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    minlength: 2
  },
  expensetype: {
    type: String,
    require: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    minlength: 2,
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"]
  },
  phone: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;