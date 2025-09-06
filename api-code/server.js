const express = require('express')
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));
//app.options('*', cors());
const upload_Image = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});
app.post('/users', (req, res) => {
    const userData = req.body;
    let users = [];
    // Read existing contacts if file exists
    if (fs.existsSync('users.json')) {
        users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    }
    users.push({ id: users.length + 1, ...userData });
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'Message saved to users.json' });
});
// GET endpoint to fetch all contacts
app.get('/users', (req, res) => {
    let user = [];
    if (fs.existsSync('users.json')) {
        user = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    }
    res.json(user);
});
app.get('/users/:id', (req, res) => {
    let users = [];
    if (fs.existsSync('users.json')) {
        users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    }
    const id = req.params.id;
    const user = users.find(a => String(a.id) === String(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});
/**   end point for contact      */
app.post('/contact', (req, res) => {
    const contactData = req.body;
    let contact = [];
    if (fs.existsSync('contact.json')) {
        contact = JSON.parse(fs.readFileSync('contact.json', 'utf8'));
    }
    contact.push(contactData);
    fs.writeFileSync('contact.json', JSON.stringify(contact, null, 2));
    res.status(201).json({ message: 'Message saved to contact.json' });
});
app.get('/contact', (req, res) => {
    let contact = [];
    if (fs.existsSync('contact.json')) {
        contact = JSON.parse(fs.readFileSync('contact.json', 'utf8'));
    }
    res.json(contact);
})
/**   end point for articles      */
app.post('/articles', upload_Image.single("image"), (req, res) => {
    try {
        const articlesData = req.body;
        let articles = [];
        if (fs.existsSync('articles.json')) {
            articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
        }
        let base64Image = null;
        if (req.file) {
            base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }
        const newArticle = {
            id: articles.length + 1,
            ...articlesData,
            image: base64Image
        };
        articles.push(newArticle);
        fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
        res.status(201).json({ message: 'Article saved to articles.json', article: newArticle });
    } catch (error) {
        console.error("Error saving article:", error);
        res.status(500).json({ message: 'Error saving article' });
    }
});
app.get('/articles', (req, res) => {
    let articles = [];
    const topic = req.query.topic;
    if (fs.existsSync('articles.json')) {
        articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
    }
    if (topic) {
        articles = articles.filter(article => article.topic === topic);
    }
    res.json(articles);
});
app.get('/articles/:id', (req, res) => {
    let articles = [];
    if (fs.existsSync('articles.json')) {
        articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
    }
    const id = req.params.id;
    const article = articles.find(a => String(a.id) === String(id));
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
});

app.get('/articles/firstfour/get', (req, res) => {
    let articles = [];

    if (fs.existsSync('articles.json')) {
        articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
    }
    console.log(articles)
    res.json(articles.slice(0, 4));
});
//create a new end points that fetch last four articlescc
app.get('/articles/lastfour/le', (req, res) => {
    let articles = [];
    if (fs.existsSync('articles.json')) {
        articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
    }
    res.json(articles.slice(-4));
});
/** end point for comments  */
app.post('/comments', (req, res) => {
    const commentsData = req.body;
    let comments = [];
    if (fs.existsSync('comments.json')) {
        try {
            comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
        } catch (e) {
            console.error("Error reading comments.json:", e);
            comments = [];
        }
    }
    comments.push(commentsData);
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
    res.status(201).json({ message: 'Message saved to comments.json' });
});
app.get('/comments', (req, res) => {
    let comments = [];
    if (fs.existsSync('comments.json')) {
        comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    }
    res.json(comments);
});
/** end point for Likes  */
app.post('/postLike', (req,res) => {   
    const likeData = req.body;
    let likes = [];
    if( fs.existsSync('postLike.json')){
        try{
            likes = JSON.parse(fs.readFileSync('postLike.json','utf8'));
        }catch(e){
            console.error("Error reading postLike.json:", e);
            likes = [];
        }   
    }
    // fetch existing like by userid and articleid
    const existingLikeIndex = likes.findIndex(like => String(like.userid) === String(likeData.userid) && String(like.articleid) === String(likeData.articleid));
    if (existingLikeIndex !== -1) {
        // Update existing like
        likes[existingLikeIndex] = { ...likes[existingLikeIndex], ...likeData };
    }
    else {
        // Add new like
        likes.push({ id: likes.length + 1, ...likeData });
    }  
    fs.writeFileSync('postLike.json', JSON.stringify(likes, null,2));
    res.status(201).json({message: 'Message saved to postLike.json'}); 
});
    // GET endpoint to fetch likes based on articleid and userid
app.get('/postLike', (req, res) => {
    let likes = [];
    if (fs.existsSync('postLike.json')) {
        likes = JSON.parse(fs.readFileSync('postLike.json', 'utf8'));
    }
    const { articleid, userid } = req.query;
    let filteredLikes = likes;
    if (articleid) {
        filteredLikes = filteredLikes.filter(like => String(like.articleid) === String(articleid));
    }
    if (userid) {
        filteredLikes = filteredLikes.filter(like => String(like.userid) === String(userid));
    }
    let totalLikes = likes.filter(
        like => String(like.articleid) === String(articleid) && like.isliked
    ).length;
res.json({filteredLikes, totalLikes});
    
});
app.post('/userfollow', (req,res) => {
    const followData = req.body;
    let userfollow = [];
    if( fs.existsSync('userfollow.json')){
        try{
            userfollow = JSON.parse(fs.readFileSync('userfollow.json','utf8'));
        }catch(e){
            console.error("Error reading userfollow.json:", e);
            userfollow = [];
        }
    }
    const existingFollowIndex = userfollow.findIndex(follow => String(follow.myid) === String(followData.myid) && String(follow.userid) === String(followData.userid));
    if (existingFollowIndex !== -1) {
        userfollow[existingFollowIndex] = { ...userfollow[existingFollowIndex], ...followData };
    }
    else {
    userfollow.push({ id: userfollow.length + 1, ...followData });
    }
    fs.writeFileSync('userfollow.json', JSON.stringify(userfollow, null,2));
    res.status(201).json({message: 'Message saved to userfollow.json'});    
})
app.get('/userfollow', (req, res) => {
    let userfollow = [];    
    if (fs.existsSync('userfollow.json')) {
        userfollow = JSON.parse(fs.readFileSync('userfollow.json', 'utf8'));
    }   
    const { userid, myid } = req.query;
    let filteredfollow = userfollow;
    if (userid) {
        filteredfollow = filteredfollow.filter(userfollow => String(userfollow.userid) === String(userid));
    }   
    if (myid) {
        filteredfollow = filteredfollow.filter(userfollow => String(userfollow.myid) === String(myid));
    }   
res.json({filteredfollow});   
});

app.listen(5174, () => console.log('Server running on port 5174'));
