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

const user1Schema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  password : String,
  confirmPassword:String,
  email:String
})

const User = mongoose.model('User', userSchema);//Login page Schema

const SignUpData = mongoose.model('SignUpData', user1Schema);//SignUp page Schema

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


app.post('/api/registerSignUp-data', async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
  
  const newUser = new  SignUpData({ firstname, lastname, email, password, confirmPassword });
  // Check if the user already exists (you can add more validation here)
      const existingUser = await SignUpData.findOne({ email });

      if (existingUser) {
          return res.status(400).json(alert("User is Already registred"));
          
      }

    // Data saved in Db
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});