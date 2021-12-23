// const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB= require('./config/db');


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));

app.use(
 cors({origin: [
  "https://sunrise-management-system.herokuapp.com",
  "https://sunrise-management-system.vercel.app",
  //  process.env.FRONT_END,
  //  process.env.BACK_END,
  //  process.env.REACT_APP_FRONT_END,
  //  process.env.REACT_APP_BACK_END
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

const userRouter = require('./routes/userRouter')
// const userAuth = require('./routes/auth')
const staffRouter = require('./routes/staff')
const studentRouter = require('./routes/student')
const resultRouter = require('./routes/result');
const uploadRouter = require('./routes/upload')

app.use('/auth', userRouter)
app.use('/staffs', staffRouter)
app.use('/students', studentRouter)
app.use('/results', resultRouter)
app.use('/upload', uploadRouter)

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'build')))
  
//   app.route('/*').get(function(req, res) { 
//    return res.sendFile(path.join(__dirname, 'build/index.html')); 
//   });

// }



