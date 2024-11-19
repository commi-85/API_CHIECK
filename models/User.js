const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    structure: {
        type: String,
        reauired: true
    },

    matricule: {
        type: String,
        reauired: true
    },

    name: {
        type: String,
        reauired: true
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;

