const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({path: './.env'});
const PORT = process.env.PORT||3000;

require('./config');// ici on importe la connection à Momgo atlas 

const User = require('./models/User');

const app = express();
app.use(express.json());

app.get('/users',async (req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
} )

app.post('/users',async (req, res) =>{
    try {
        const {structure, matricule,name} = req.body;
        const users = await User.create({structure, matricule,name});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
} )

// requete de mise à jour 

app.put("/users/:id", async (req, res)=> {
    const id= req.params.id;
    try {
        const {structure, matricule, name} = req.body;

        const updatedUser = await User.findByIdAndUpdate(id,
            {structure, matricule, name},
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
} )

//requete de suppression


app.delete("/users/:id", async (req, res) => {
    const id = req.params.id; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});


app.listen(PORT, () => {
    console.log('servers is running at http://localhost:3000')
});