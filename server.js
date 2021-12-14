import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db'

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

import userRouter from './routes/userRouter';
import staffRouter from './routes/staff'
import studentRouter from './routes/student';
import uploadRouter from './routes/upload'

app.use('/auth', userRouter)
app.use('/staffs', staffRouter)
app.use('/students', studentRouter)
app.use('/upload', uploadRouter)

app.use(express.static(path.join(__dirname, 'build')))

app.route('/*').get(function(req, res) { 
 return res.sendFile(path.join(__dirname, 'build/index.html')); 
});