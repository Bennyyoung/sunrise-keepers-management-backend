const express = require('express');

const router = express.Router();
let Result = require('../models/result.model');

router.route('/').get((req, res) => {
  Result.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  const studentname = req.body.studentname;
  const studentclass = req.body.studentclass;
  const subject = req.body.subject;
  const test = req.body.test;
  const exam = req.body.exam;
  const resultdate = Date.parse(req.body.resultdate);
  const responsible = req.body.responsible;

  const newResult = new Result({
    studentname,
    studentclass,
    subject,
    test,
    exam,
    resultdate,
    responsible
  });

  newResult.save()
    .then(() => res.json('Student result uploaded')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Result.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Result.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student Result deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
  Result.findByIdAndUpdate(req.params.id)
    .then(result => {
      result.studentname = req.body.studentname;
      student.studentclass = req.body.studentclass;
      result.subject = req.body.subject;
      result.test = req.body.test;
      result.exam = req.body.exam;
      result.resultdate = Date.parse(req.body.resultdate);
      result.responsible = req.body.responsible;

      result.save()
        .then(() => res.json('Result updated succesfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;