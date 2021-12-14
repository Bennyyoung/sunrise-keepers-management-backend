const express = require('express');

const router = express.Router();
let Staff = require('../models/staff.model');
const auth  = require('../middleware/auth')

// Create Staff
// router.route('/add-staff').post((req, res) => {
//  Staff.create(req.body)
//   .then(staff => res.json(staff))
//   .catch(err => res.status(400).json('Error: ' + err));
// })

// Read Staff
router.route('/').get((req, res) => {
 Staff.find()
  .then(staff => res.json(staff))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
 const firstname = req.body.firstname;
 const lastname = req.body.lastname;
 const email = req.body.email;
 const joiningdate = Date.parse(req.body.joiningdate);
 const password = req.body.password;
 const confirmpassword = req.body.confirmpassword;
 const mobilenumber = Number(req.body.mobilenumber);
 const gender = req.body.gender;
 const designation = req.body.designation;
 const dateofbirth = Date.parse(req.body.dateofbirth);
 const education = req.body.education;

 const newStaff = new Staff({
  firstname,
  lastname,
  email,
  joiningdate,
  password,
  confirmpassword,
  mobilenumber,
  gender,
  designation,
  dateofbirth,
  education
 });

 newStaff.save()
  .then(() => res.json('Staff added')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
 Staff.findById(req.params.id)
  .then(staff => res.json(staff))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
 Staff.findByIdAndDelete(req.params.id)
  .then(() => res.json('Staff deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
 Staff.findById(req.params.id)
  .then(staff => {
   staff.firstname = req.body.firstname;
   staff.lastname = req.body.lastname;
   staff.email = req.body.email;
   staff.joiningdate = Date.parse(req.body.joiningdate);
   staff.password = req.body.password;
   staff.confirmpassword = req.body.confirmpassword;
   staff.mobilenumber = Number(req.body.mobilenumber);
   staff.gender = req.body.gender;
   staff.designation = req.body.designation;
   staff.dateofbirth = Date.parse(req.body.dateofbirth);
   staff.education = req.body.education;

   staff.save()
    .then(() => res.json('Staff updated succesfully'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;