require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Define a Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
});

const User = mongoose.model('User', userSchema);

// Handle POST request to create a new user
app.post('/api/users', async (req, res) => {
    const { name, age, gender } = req.body;
    try {
        const newUser = new User({ name, age, gender });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Handle PUT request to update an existing user by ID
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, gender } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age, gender },
            { new: true, runValidators: true }
        );
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Handle DELETE request to remove a user by ID
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 