// const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
// const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require("cors");
// const dotenv = require("dotenv");
const connectDB= require('./config/db');

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));

app.use(
 cors({origin: [
   "https://sunrise-management-system.vercel.app/",
   "https://sunrise-management-system.herokuapp.com/",
  ],

  methods: ["GET", "PATCH", "OPTIONS", "POST", "PUT", "DELETE"],
  credentials: true,
 })
)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port: ${PORT}`);
});

// Connect DB
connectDB();

app.get("/", (req, res) => {
 res.send("Server is running.");
})

const userRouter = require('./routes/api/user')
const userAuth = require('./routes/api/auth')
const staffRouter = require('./routes/api/staff')
const studentRouter = require('./routes/api/student')
const uploadRouter = require('./routes/api/upload')

app.use('/auth', userRouter)
app.use('/staffs', staffRouter)
app.use('/students', studentRouter)
app.use('/upload', uploadRouter)

app.use(express.static(path.join(__dirname, 'build')))

app.route('/*').get(function(req, res) { 
 return res.sendFile(path.join(__dirname, 'build/index.html')); 
});