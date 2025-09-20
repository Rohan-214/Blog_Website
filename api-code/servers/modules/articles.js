const mongoose = require('mongoose');

const ArticlesSchema = new mongoose.Schema({
  topic: {
    type: String
  },

  specificTopic: {
    type: String
  },

  title: {
    type: String
  },
  content:{
    type: String
  },

  userid: {
    type: String
  },

  time: {
    type: Date,
    default: Date.now
  },

  day: {
    type: String
  },
  image: {
    type: String
  }
}
);

const Articles = mongoose.model('Article', ArticlesSchema);

module.exports = Articles;
