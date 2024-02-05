const pokemon = require('../models/modelPokemon.js');
const express = require('express');

exports.AfficherUnPokemon = (req, res) => {

    pokemon.Pokemon.RequeteUnPokemon(req.params.id, (erreur, resultat) => {

        if (erreur) {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la récupération du pokemon avec l'id ${params}");
        } else {
            if (resultat.length === 0) {
                res.status(404).send("Pokemon introuvable avec l'id ${params}");
            } else {
                res.send(resultat);
            }

        }

    });


}

exports.AfficherListePokemons = (req, res) => {

    const page = req.query.page;
    const offset = (page - 1) * 25;
    const params = [req.query.type, offset];

    pokemon.ListePokemon.RequeteListePokemons(params, (erreur, resultat) => {

        if (erreur) {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la récupération de la liste des pokemons");
        } 
        else if (resultat.length === 0) {
            res.status(404).send("Aucun pokemon de type ${req.params.type} trouvé");
        }
        else {
            res.send(resultat);
        }

    });

}

exports.AjouterUnPokemon = (req, res) => {
    
    const params = [req.query.nom, req.query.type_primaire, req.query.type_secondaire];
    
    pokemon.AjouterUnPokemon.RequeteAjouterUnPokemon(params, (erreur, resultat) => {
    
        if (erreur) {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la création du pokemon ${req.params.nom}");
        } 
        else if(resultat.length === 0){
            res.status(404).send("Le pokemon id ${req.params.id} n'a pas été ajouté");
        }
        else {
            res.status(201).send("Le pokemon ${req.params.nom} a été ajouté avec succès");
        }

    });

}

exports.ModifierUnPokemon = (req, res) => {
    
    const params = [req.query.nom, req.query.type_primaire, req.query.type_secondaire,req.query.id];

    pokemon.ModifierUnPokemon.RequeteModifierUnPokemon(params, (erreur, resultat) => {
    
        if (erreur) {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la modification du pokemon ${req.params.nom}");
        } 
        else if(resultat.length === 0){
            res.status(404).send("Le pokemon id ${req.params.id} n'existe pas dans la base de données");
        }
        else {
            res.status(201).send("Le pokemon id ${req.params.id} a été modifié avec succès");
        }

    });
}

exports.SupprimerUnPokemon =(req, res) =>{
    const params = [req.query.id];

    pokemon.SupprimerUnPokemon.RequeteSupprimerUnPokemon(params, (erreur,resultat) => {
        if(erreur){
            console.log("Erreur: ",erreur);
            res.status(500).send("Echec lors de la suppression du pokemon ${req.params.nom}");
        }
        else if(resultat.length === 0){
            res.status(404).send("Le pokemon id ${req.params.id} n'existe pas dans la base de données");

        }
        else{
            res.status(201).send("Le pokemon id ${req.params.id} a été supprimé avec succès");
        }
    });

}