// require("dotenv").config();
// const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require("cors");
// const dotenv = require("dotenv");
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port: ${PORT}`);
});

// const server_port = 5000

// app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));

// var hostedurl_origin = 'https://skms.netlify.app'
// var localhosturl_origin = 'http://localhost:3000'

// if (process.env.PORT === process.env.PORT) {
//  return hostedurl_origin
// } else if (server_port) {
//  return localhosturl_origin }

app.use(
 cors({
  // origin: ['https://skms.netlify.app http://localhost:3001/'],
  // origin: ['http://localhost:3000'],
  // origin: ['https://skms.netlify.app'],
  // origin: [`${hostedurl_origin}, ${localhosturl_origin}`],
  origin: [
   "https://sunrise-management-system.vercel.app/",
   "https://sunrise-management-system.herokuapp.com/",
  ],


  methods: ["GET", "PATCH", "OPTIONS", "POST", "PUT", "DELETE"],
  credentials: true,
 })
)

// Connect DB
connectDB();

app.get("/", (req, res) => {
 res.send("Server is running.");
})



const userRouter = require('./routes/userRouter')
// const userAuth = require('./routes/auth')
const staffRouter = require('./routes/staff')
const studentRouter = require('./routes/student')
const uploadRouter = require('./routes/upload')
// const gradeRouter = require('./routes/grade')
// const expenseRouter = require('./routes/expense')
// const feesRouter = require('./routes/fees')
// require('./routes/student')
// require('./routes/student')

app.use('/auth', userRouter)
// app.use('/login', userAuth)
app.use('/staffs', staffRouter)
app.use('/students', studentRouter)
app.use('/upload', uploadRouter)

app.route('/*').get(function(req, res) { 
 return res.sendFile(path.join(__dirname, 'public/index.html')); 
});


// app.use('/grades', gradeRouter)
// app.use('/expenses', expenseRouter)
// app.use('/fees', feesRouter)




// if (process.env.NODE_ENV === "production") {
//     app.use
// }

// if (process.env.NODE_ENV === "production") {
//  app.use(express.static("build"));
//  app.get("*", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "build/index.html"));
//  });
// }



// 404 Error
// app.use((req, res, next) => {
//  next(createError(404));
// });

// app.use(function (err, req,res, next) {
//  console.error(err.message);
//  if (!err.statusCode) err.statusCode = 500;
//  res.status(err.statusCode).send(err.message);
// });