

const express = require('express');
const connectDB = require('./config/db');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const cors = require('cors'); // Import CORS package
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const chatbot = require('./routes/chatRoutes')





const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(
//   cors({
//     origin: 'http://localhost:5176/', // Replace with your frontend URL
//   })
// );
// // Enable CORS for the frontend URL

app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

const SECRET = "your_jwt_secret";

// Routes
app.use('/api/marketplace', marketplaceRoutes);
// app.use('/', chatbot);


// Register Route
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(400).json({ error: 'User registration failed' });
  }
});
// validator
// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email not found' });
    }

    // Compare password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid JSON payload' });
  }
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: err.message,
  });
});



// Get All Users Route
// app.get('/api/users', async (req, res) => {
//   try {
//     // Fetch all users from the database
//     const users = await User.find();

//     // Return the users data
//     res.status(200).json({ users });
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });








////////////////Ai 
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/Ai", async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);
  res.send(result.response.text());
});

//////////////////////////////////////////
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
