const mongoose = require('mongoose');

// A Schema defines the structure of a document in a collection.
// It specifies the fields, their types, and any constraints.
const postLikeSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true // This field must be provided
    },
    articleid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    isliked: {
        type: Boolean,
        required: true,
    },
    count:{
        type: Number,
        required: true,
    }

});

// A Model is a class that's compiled from the Schema.
// It provides an interface to the database for creating, querying, updating, deleting records, etc.
const PostLike = mongoose.model('PostLike', postLikeSchema);

// Export the model so it can be used in other parts of the application.
module.exports = PostLike;