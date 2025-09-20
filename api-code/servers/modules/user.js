const mongoose = require('mongoose');

// A Schema defines the structure of a document in a collection.
// It specifies the fields, their types, and any constraints.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // This field must be provided
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    phone_number: {
        type: Number,
        required: true,
        unique:true 
    },
    password: {
        type:String,
        required: true
    },
    user_image: {
        type: String
    }

});

// A Model is a class that's compiled from the Schema.
// It provides an interface to the database for creating, querying, updating, deleting records, etc.
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other parts of the application.
module.exports = User;