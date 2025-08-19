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


app.listen(5174, () => console.log('Server running on port 5174'));
