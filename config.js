require('dotenv').config({path: './.env'});

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT||3000;

function connexion(){
    mongoose.connect(MONGO_URI)
    .then(()=> {
        console.log('connexion à MongoDB Atlas réussie!');
    })
    .catch((err)=>{
        console.log(err);
    })
}

connexion();

module.exports = connexion;
