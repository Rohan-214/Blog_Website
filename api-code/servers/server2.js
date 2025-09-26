// Forcing a new deploy on Render - Sept 26
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./modules/user.js'); // Import the User model
const Articles = require('./modules/articles.js'); // Import the User model
const multer = require('multer');
const Userfollow = require('./modules/userfollow.js');
const PostLike = require('./modules/postLike.js');
const Comments = require('./modules/comments.js');
const app = express();
const port = 5174;
// Middleware to parse JSON bodies. This is needed to read `req.body`.
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));
const upload_Image = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});
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

    }
}
// --- CRUD Routes ---
app.get('/avatar/:name', (req, res) => {
    const svg = generateLetterAvatar(req.params.name);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
});
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
app.get('/users/:id', async (req, res) => {
    try {
        const user = await dbOperation(async () => {
            return await User.findById(req.params.id);
        });
        if (!user) return res.status(404).send({ error: "User not found" });
        res.status(200).send(user);
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
app.post('/articles', upload_Image.single("image"), async (req, res) => {
    try {
        let base64Image = null;
        if (req.file) {
            base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }
        const newArticle = await dbOperation(async () => {
            const articleData = {
                ...req.body,
                image: base64Image
            };
            const articles = new Articles(articleData); // Create a new user instance from request body
            console.log(articles, "awef");
            return await articles.save(); // Save it to the database
        });
        res.status(201).send(newArticle); // Send back the created user with a 201 status
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
app.get('/articles', async (req, res) => {
    try {
        const filter = {};
        if (req.query.topic) {
            filter.topic = req.query.topic;
        }
        const articles = await dbOperation(async () => {
            console.log(Articles);
            return await Articles.find(filter); // Find all documents in the User collection

        });
        res.status(200).send(articles); // Send back the array of users
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.get('/articles/:id', async (req, res) => {
    try {
        const articles = await dbOperation(async () => {
            return await Articles.findById(req.params.id);
        });
        if (!articles) return res.status(404).send({ error: "User not found" });
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.get('/articles/firstfour/get', async (req, res) => {
    try {
        const articles = await dbOperation(async () => {
            return await Articles.find({}).limit(4);
        });
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// In your Express routes file (e.g., server.js or routes/user.js)
// Make sure you've imported your Userfollow model

app.post('/userfollow', async (req, res) => {
    try {
        const { myid, userid, isfollowing } = req.body;
        // The query to find the specific follow relationship
        const query = { myid: myid, userid: userid };
        // The data to update or insert
        const update = { isfollowing: isfollowing };
        // Options: 
        // upsert: true -> create a new doc if none is found
        // new: true -> return the new, updated document instead of the old one
        const options = { upsert: true, new: true };
        const updatedFollow = await Userfollow.findOneAndUpdate(query, update, options);
        res.status(200).json({
            message: 'Follow status updated successfully.',
            followStatus: updatedFollow
        });
    } catch (error) {
        console.error("Error in /userfollow route:", error);
        res.status(500).json({ message: 'An error occurred.' });
    }
});
app.get('/userfollow', async (req, res) => {
    try {
        const { myid, userid } = req.query;
        let query = {};
        if (myid) {
            query.myid = myid;
        }
        if (userid) {
            query.userid = userid;
        }
        const userfollow = await Userfollow.find(query);
        res.status(200).json(userfollow);

    } catch (error) {

        res.status(500).json({ message: 'An error occurred.' });
    }
});
app.post('/postlike', async (req, res) => {
    try {
        const { articleid, userid, isliked, count } = req.body;

        // This will find a document with the matching user and article ID
        const query = { articleid: articleid, userid: userid };

        // This will set the 'isliked' status
        const update = { isliked: isliked, count: count };

        // 'upsert: true' creates the document if it doesn't exist.
        // 'new: true' ensures the updated document is returned.
        const options = { upsert: true, new: true };

        // This single command handles everything: creating or updating.
        const updatedLike = await PostLike.findOneAndUpdate(query, update, options);

        // Recalculate the total likes for the article
        const likeCount = await PostLike.countDocuments({ articleid: articleid, count: { $gt: 1 } });

        res.status(200).json({
            message: 'Like status updated successfully.',
            likeStatus: { ...updatedLike.toObject(), count: likeCount }
        });

    } catch (error) {
        console.error("Error in /postlike route:", error);
        res.status(500).json({ message: 'An error occurred while updating like status.' });
    }
});
app.get('/postlike', async (req, res) => {
    try {
        const { articleid, userid } = req.query;
        let query = {};
        if (articleid) {
            query.articleid = articleid;
        }
        if (userid) {
            query.userid = userid;
        }
        const postlike = await PostLike.find(query);
        console.log(postlike);
        // const count  = await PostLike.countDocuments(query);
        // console.log(count);
        res.status(200).json(postlike);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
})
app.post('/comments', async (req, res) => {
    try {
        const newComments = await dbOperation(async () => {
            const comments = new Comments(req.body); // Create a new user instance from request body
            return await comments.save(); // Save it to the database
        });
        res.status(201).send(newComments); // Send back the created user with a 201 status
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
app.get('/comments', async (req, res) => {
    try {
        const filter = {};
        if (req.query.articleid) {
            filter.articleid = req.query.articleid;
        }
        const comments = await dbOperation(async () => {
            return await Comments.find(filter); // Find all documents in the User collection
        });
        res.status(200).send(comments); // Send back the array of users
    }
    catch{
        res.status(500).send({ error: error.message });
    }
});
// Start the server
app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });