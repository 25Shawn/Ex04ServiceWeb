const pokemon = require('../models/modelPokemon.js');
const express = require('express');

exports.AfficherUnPokemon = (req, res) => {

    pokemon.Pokemon.RequeteUnPokemon(req.params.id)

        .then(resultat => {
            if (resultat.length === 0) {
                // NOTE : Le format de la réponse n'est pas comme demandé dans l'énoncé
                res.status(404).send("Pokemon introuvable avec l'id ${params}");
            } else {
                // NOTE : Tu dois renvoyer un seul élément
                res.send(resultat);
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la récupération du pokemon avec l'id ${params}");
        });
}

exports.AfficherListePokemons = (req, res) => {
    // NOTE : Si la page n'est pas spécifiée, l'exécution de la requête SQL échouera
    const page = req.query.page;
    const offset = (page - 1) * 25;
    const params = [req.query.type, offset];

    pokemon.ListePokemon.RequeteListePokemons(params)
        .then(resultat => {
            if (resultat.length === 0) {
                // NOTE : Pas demandé dans l'énoncé
                res.status(404).send(`Aucun pokemon de type ${req.query.type} trouvé`);
            } else {
                // NOTE : Il manque des éléments dans la réponse
                res.send(resultat);
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la récupération de la liste des pokemons");
        });
};


exports.AjouterUnPokemon = (req, res) => {
    // NOTE : Tu dois vérifier que les paramètres sont bien présents
    const params = [req.query.nom, req.query.type_primaire, req.query.type_secondaire];
    // NOTE : Ne retourne pas de message d'erreur s'il manque des paramètres
    pokemon.AjouterUnPokemon.RequeteAjouterUnPokemon(params)
    
        .then(resultat => {
            if(resultat.length === 0){
                res.status(404).send("Le pokemon id ${req.params.id} n'a pas été ajouté");
            }
            else {
                // NOTE : Le format de la réponse n'est pas comme demandé dans l'énoncé
                res.status(201).send("Le pokemon ${req.params.nom} a été ajouté avec succès");
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la création du pokemon ${req.params.nom}");
        });
        

}

exports.ModifierUnPokemon = (req, res) => {
    // NOTE : Tu dois vérifier que les paramètres sont bien présents
    const params = [req.query.nom, req.query.type_primaire, req.query.type_secondaire,req.query.id];
    // NOTE : Ne retourne pas de message d'erreur s'il manque des paramètres
    pokemon.ModifierUnPokemon.RequeteModifierUnPokemon(params)
    
        .then(resultat => {
            if(resultat.length === 0){
                // NOTE : Tu dois faire la vérification avant d'appeler la méthode pour modifier le pokemon
                res.status(404).send("Le pokemon id ${req.params.id} n'existe pas dans la base de données");
            }
            else {
                // NOTE : Le format de la réponse n'est pas comme demandé dans l'énoncé
                // NOTE : Le status devrait être 200
                res.status(201).send("Le pokemon id ${req.params.id} a été modifié avec succès");
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la modification du pokemon ${req.params.nom}");
        });
}

exports.SupprimerUnPokemon =(req, res) =>{
    // NOTE : Le paramètre id doit être dans la requête (req.params.id)
    const params = [req.query.id];

    pokemon.SupprimerUnPokemon.RequeteSupprimerUnPokemon(params)

        .then(resultat => {
            if(resultat.length === 0){
                // NOTE : Tu dois faire la vérification avant d'appeler la méthode pour supprimer le pokemon
                res.status(404).send("Le pokemon id ${req.params.id} n'existe pas dans la base de données");
            }
            else {
                // NOTE : Le format de la réponse n'est pas comme demandé dans l'énoncé
                // NOTE : Le status devrait être 200
                res.status(201).send("Le pokemon id ${req.params.id} a été supprimé avec succès");
            }
        })
        .catch(erreur => {
            console.log("Erreur: ", erreur);
            res.status(500).send("Echec lors de la suppression du pokemon ${req.params.nom}");
        });
}