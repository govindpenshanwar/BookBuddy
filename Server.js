// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
app.use(express.static('public', { maxAge: 31536000 })); // 1 year in seconds


//  CORS for all routes
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and other credentials to be included
};

app.use(cors(corsOptions));




// Parsing JSON requests from here
app.use(bodyParser.json());

// MongoDB  setup
mongoose.connect('mongodb://127.0.0.1:27017/BookBuddy-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Defining Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});


const User = mongoose.model('User', userSchema);

// API endpoint to receive user data from the React app
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const newUser = new User({ username, password });

    //Data saved in Db
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});