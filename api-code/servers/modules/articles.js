const mongoose = require('mongoose');

const ArticlesSchema = new mongoose.Schema({
  // internal numeric ID if needed (MongoDB already gives _id by default)
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
    type: String // could also be mongoose.Schema.Types.ObjectId if referencing Users
  },

  time: {
    type: Date,
    default: Date.now
  },

  day: {
    type: String
  },

  user_Image: {
    type: String, // filename or URL, empty if not set
    default: ""
  },

  image: {
    type: String
  }
}
);

const Articles = mongoose.model('Articles', ArticlesSchema);

module.exports = Articles;

