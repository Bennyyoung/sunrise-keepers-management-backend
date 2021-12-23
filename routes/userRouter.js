const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

// Register
router.post("/", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validation
    if (!email || !password || !confirmPassword)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter a password of at least 6 characters."
        });
    if (password !== confirmPassword)
      return res.status(400).json({ errorMessage: "Passwords don't match" });

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ errorMessage: "User already exist" });

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash)

    // Save a new user account to the db
    const newUser = new User({
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();
    console.log(savedUser)

    // Sign the token 

    const token = await jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );
    console.log(token)

    // Send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
    }).send();


  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate

    if (!email || !password)
      return res.status(400).json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // Login the token

    const token = await jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // Send the token in a HTTP-only cookie

    res.cookie("token", token, {
      httpOnly: true,
    }).send();

    // Clear the cookie

  } catch (err) {
    console.error(err);
    res.status(500).send()
  }
});

router.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send();
});


router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    console.error(err);
    res.json(false);
  }

})



module.exports = router;