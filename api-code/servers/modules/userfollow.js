const mongoose = require('mongoose');

// A Schema defines the structure of a document in a collection.
// It specifies the fields, their types, and any constraints.
const userfollowSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    myid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // This field must be provided
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isfollowing: {
        type: Boolean,
        required: true,
    }
},{
    _id: false
});
// A Model is a class that's compiled from the Schema.
// It provides an interface to the database for creating, querying, updating, deleting records, etc.
const Userfollow = mongoose.model('userfollow', userfollowSchema);
// Export the model so it can be used in other parts of the application.
module.exports = Userfollow;