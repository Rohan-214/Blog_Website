// ===============================================================
// FINAL CORRECTED server2.js
// ===============================================================
// Final push at 10:40 PM

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

// --- Require all your models ---
const User = require('./modules/user.js');
const Articles = require('./modules/articles.js');
const Userfollow = require('./modules/userfollow.js');
const PostLike = require('./modules/postLike.js');
const Comments = require('./modules/comments.js');

const app = express();
// For Render, it's best to use their port or a default
const port = process.env.PORT || 5174;

// --- Middleware ---
app.use(cors()); // A simple cors() is enough for now
app.use(express.json());

// --- Database Connection ---
const dbURI = "mongodb+srv://srivastavarohan214_db_user:vi8uhhnPR1J3JhAB@bloggingwebsite.8hx8xss.mongodb.net/";

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB database successfully!');
    // Only start listening for requests after the database connection is successful
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process with an error code
  });


// --- Test Route ---
app.get('/test-route', (req, res) => {
  res.send("Success! The new version of the code is live!");
});

const upload_Image = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});


// --- Your API Routes ---

// NOTE: We have removed the `dbOperation` wrapper from all routes
// because we are now connected to the database globally.

app.get('/avatar/:name', (req, res) => {
    // You need to define the generateLetterAvatar function for this to work
    // const svg = generateLetterAvatar(req.params.name); 
    // res.setHeader('Content-Type', 'image/svg+xml');
    // res.send(svg);
    res.status(404).send('Avatar generation not implemented yet.');
});
app.get('/' , (req,res) => {
    res.send("Success! The new version of the code is live!");
})

// CREATE a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// READ all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// GET a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ error: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// UPDATE a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).send({ error: 'User not found!' });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send({ error: 'User not found!' });
        res.status(200).send({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// CREATE an article
app.post('/articles', upload_Image.single("image"), async (req, res) => {
    try {
        let base64Image = null;
        if (req.file) {
            base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }
        const articleData = { ...req.body, image: base64Image };
        const article = new Articles(articleData);
        const newArticle = await article.save();
        res.status(201).send(newArticle);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// GET all articles (with optional topic filter)
app.get('/articles', async (req, res) => {
    try {
        const filter = {};
        if (req.query.topic) {
            filter.topic = req.query.topic;
        }
        const articles = await Articles.find(filter);
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// GET a single article by ID
app.get('/articles/:id', async (req, res) => {
    try {
        const article = await Articles.findById(req.params.id);
        if (!article) return res.status(404).send({ error: "Article not found" });
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// GET first four articles
app.get('/articles/firstfour/get', async (req, res) => {
    try {
        const articles = await Articles.find({}).limit(4);
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// --- User Follow Routes ---
app.post('/userfollow', async (req, res) => {
    try {
        const { myid, userid, isfollowing } = req.body;
        const query = { myid: myid, userid: userid };
        const update = { isfollowing: isfollowing };
        const options = { upsert: true, new: true };
        const updatedFollow = await Userfollow.findOneAndUpdate(query, update, options);
        res.status(200).json({
            message: 'Follow status updated successfully.',
            followStatus: updatedFollow
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});

app.get('/userfollow', async (req, res) => {
    try {
        const { myid, userid } = req.query;
        let query = {};
        if (myid) query.myid = myid;
        if (userid) query.userid = userid;
        const userfollow = await Userfollow.find(query);
        res.status(200).json(userfollow);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});


// --- Post Like Routes ---
app.post('/postlike', async (req, res) => {
    try {
        const { articleid, userid, isliked, count } = req.body;
        const query = { articleid: articleid, userid: userid };
        const update = { isliked: isliked, count: count };
        const options = { upsert: true, new: true };
        const updatedLike = await PostLike.findOneAndUpdate(query, update, options);
        const likeCount = await PostLike.countDocuments({ articleid: articleid, count: { $gt: 1 } });
        res.status(200).json({
            message: 'Like status updated successfully.',
            likeStatus: { ...updatedLike.toObject(), count: likeCount }
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating like status.' });
    }
});

app.get('/postlike', async (req, res) => {
    try {
        const { articleid, userid } = req.query;
        let query = {};
        if (articleid) query.articleid = articleid;
        if (userid) query.userid = userid;
        const postlike = await PostLike.find(query);
        res.status(200).json(postlike);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});


// --- Comments Routes ---
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comments(req.body);
        const newComment = await comment.save();
        res.status(201).send(newComment);
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
        const comments = await Comments.find(filter);
        res.status(200).send(comments);
    }
    catch (error) { // This is the corrected line
        res.status(500).send({ error: error.message });
    }
});