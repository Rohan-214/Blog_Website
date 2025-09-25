const mongoose = require('mongoose');

// A Schema defines the structure of a document in a collection.
// It specifies the fields, their types, and any constraints.
const commentSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true // This field must be provided
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true // This field must be provided
    },
    articleid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }

});

// A Model is a class that's compiled from the Schema.
// It provides an interface to the database for creating, querying, updating, deleting records, etc.
const Comments = mongoose.model('Comment', commentSchema);

// Export the model so it can be used in other parts of the application.
module.exports = Comments;