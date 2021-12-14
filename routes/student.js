const express = require('express');

const router = express.Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
 Student.find()
  .then(student => res.json(student))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
 const firstname = req.body.firstname;
 const lastname = req.body.lastname;
 const email = req.body.email;
 const registrationdate = Date.parse(req.body.registrationdate);
 const rollno = req.body.rollno;
 const studentclass = req.body.studentclass;
 const gender = req.body.gender;
 const parentsname = req.body.parentsname;
 const parentsmobilenumber = Number(req.body.parentsmobilenumber);
 const dateofbirth = Date.parse(req.body.dateofbirth);
 const bloodgroup = req.body.bloodgroup;
 const healthissues = req.body.healthissues;
 const address = req.body.address;

 const newStudent = new Student({
  firstname,
  lastname,
  email,
  registrationdate,
  rollno,
  studentclass,
  gender,
  parentsname,
  parentsmobilenumber,
  dateofbirth,
  bloodgroup,
  healthissues,
  address,
 });

 newStudent.save()
  .then(() => res.json('Student added')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
 Student.findById(req.params.id)
  .then(student => res.json(student))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
 Student.findByIdAndDelete(req.params.id)
  .then(() => res.json('Student deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
 Student.findById(req.params.id)
  .then(student => {
   student.firstname = req.body.firstname;
   student.lastname = req.body.lastname;
   student.email = req.body.email;
   student.registrationdate = Date.parse(req.body.registrationdate);
   student.rollno = req.body.rollno;
   student.studentclass = req.body.studentclass;
   student.gender = req.body.gender;
   student.parentsname = req.body.parentsname;
   student.parentsmobilenumber = Number(req.body.parentsmobilenumber);
   student.dateofbirth = Date.parse(req.body.dateofbirth);
   student.bloodgroup = req.body.bloodgroup;
   student.healthissues = req.body.healthissues;
   student.address = req.body.address;

   student.save()
    .then(() => res.json('Student updated succesfully'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;