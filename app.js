const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect } = require('./middleware/auth');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require("./routes/authRoutes")
const cookieParser = require('cookie-parser');
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const resultRoutes = require("./routes/resultRoutes.js");


const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Allow credentials
}));
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/students',protect, studentRoutes);
app.use('/api/courses',protect, courseRoutes);
app.use('/api/auth',authRoutes)
// Basic route
app.get('/', (req, res) => {
  res.send('Student Management System API');
});

app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});