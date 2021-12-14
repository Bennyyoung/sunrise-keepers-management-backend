const express = require('express')

const router = express.Router();
let Expense = require('../models/expense.model');

router.route('/').get((req, res) => {
 Expense.find()
  .then(expense => res.json(expense))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
 const name = req.body.name;
 const expensetype = req.body.expensetype;
 const amount = req.body.amount;
 const phone = Number(req.body.phone);
 const email = req.body.email;
 const status = req.body.status;
 const date = Date.parse(req.body.date);

 const newExpense = new Expense({
  name,
  expensetype,
  amount,
  phone,
  email,
  status,
  date
 });

 newExpense.save()
  .then(() => res.json('Expense added')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
 Expense.findById(req.params.id)
  .then(expense => res.json(expense))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
 Expense.findByIdAndDelete(req.params.id)
  .then(() => res.json('Expense deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').put((req, res) => {
 Expense.findByIdAndUpdate(req.params.id)
  .then(expense => {
   name = req.body.name ;
   expensetype = req.body.expensetype;
   amount = req.body.amount;
   phone = Number(req.body.phone);
   email = req.body.email;
   status = req.body.status;
   date = Date.parse(req.body.date);

   expense.save()
    .then(() => res.json('Expense updated succesfully'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;