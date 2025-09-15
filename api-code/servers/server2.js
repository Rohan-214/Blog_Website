const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./modules/user.js'); // Import the User model
const Articles = require('./modules/articles.js'); // Import the User model


const app = express();
const port = 5174;

// Middleware to parse JSON bodies. This is needed to read `req.body`.
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

// --- Database Connection ---
// Replace this with your MongoDB connection string.
const dbURI = "mongodb+srv://srivastavarohan214_db_user:vi8uhhnPR1J3JhAB@bloggingwebsite.8hx8xss.mongodb.net/";

// This is a helper function to wrap our database operations.
// It connects to the DB, runs the operation, and then disconnects.
async function dbOperation(operation) {
    try {
        // 1. Create a connection before doing anything.
        await mongoose.connect(dbURI);
        console.log('Database connection successful!');

        // 2. Perform the transaction/operation.
        const result = await operation();
        return result;

    } catch (error) {
        // If there's an error, log it.
        console.error('Database operation failed:', error);
        throw error; // Re-throw the error to be caught by the route handler

    } finally {
        // 3. Once the transaction is done (or failed), close the connection.
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
}

// --- CRUD Routes ---

// CREATE a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = await dbOperation(async () => {
            const user = new User(req.body); // Create a new user instance from request body
            return await user.save(); // Save it to the database
        });
        res.status(201).send(newUser); // Send back the created user with a 201 status
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// READ all users
app.get('/users', async (req, res) => {
    try {
        const users = await dbOperation(async () => {
            return await User.find({}); // Find all documents in the User collection
        });
        res.status(200).send(users); // Send back the array of users
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// UPDATE a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await dbOperation(async () => {
            // Find the user by ID and update it with the new data from the request body.
            // { new: true } option returns the document after the update has been applied.
            return await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        });
        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found!' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await dbOperation(async () => {
            return await User.findByIdAndDelete(req.params.id);
        });
        if (!deletedUser) {
            return res.status(404).send({ error: 'User not found!' });
        }
        res.status(200).send({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/articles', async (req, res) => {
    try {
        const newArticle = await dbOperation(async () => {
            const articles = new Articles(req.body); // Create a new user instance from request body
            return await articles.save(); // Save it to the database
        });
        res.status(201).send(newArticle); // Send back the created user with a 201 status
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});