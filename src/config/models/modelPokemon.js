const sql = require("../db.js");

class Pokemon{
    constructor(id){
        this.id = id;
    }

    static RequeteUnPokemon = (id) =>{
        return new Promise((resolve, reject) => {

            const requete = "SELECT * FROM pokemon WHERE id = ?";
            const params = [id];

            sql.query(requete, params, (erreur, resultat) => {

                if (erreur) {
                    console.error("Erreur SQL lors de la récupération du pokemon avec l'id", id, erreur);
                    reject(erreur);

                } else {
                    console.log("Résultat de la requête pour le pokemon avec l'id", id, ":", resultat);
                    resolve(resultat);

                }

            });
        });

    }
}

class ListePokemon{

    constructor(type, page){
        this.type = type;
        this.page = page;
    }

    static RequeteListePokemons = (params) => {

        return new Promise((resolve,reject) => {

            let requete = 'SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET ?';
            sql.query(requete,params, (erreur, resultat) => {

                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } 

                console.log("Résultat de la requête pour la liste des pokemons de type", params[0], ":", resultat);
                resolve(resultat);
            });
        });
    }
}

class AjouterUnPokemon{
    constructor(nom, type_primaire, type_secondaire){
        this.nom = nom;
        this.type_primaire = type_primaire;
        this.type_secondaire = type_secondaire;
    }

    static RequeteAjouterUnPokemon = (params) => {
        return new Promise((resolve, reject) => {
            const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire,pv,attaque,defense) VALUES (?,?,?,0,0,0)`;
            // NOTE : Ça veut dire qu'on ne peut pas spécifier les PV, l'attaque et la défense?
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } else {
                    resolve(resultat);
                }
            });
        });
    }

}

class ModifierUnPokemon{
    constructor(nom, type_primaire, type_secondaire, id){
        this.nom = nom;
        this.type_primaire = type_primaire;
        this.type_secondaire = type_secondaire;
        this.id = id;
    }

    static RequeteModifierUnPokemon = (params) => {
        return new Promise((resolve, reject) => {
            const requete = `UPDATE pokemon SET nom=?, type_primaire=?, type_secondaire=? WHERE id=?`;
            // NOTE : Ça veut dire qu'on ne peut pas modifier les PV, l'attaque et la défense?
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } else {
                    resolve(resultat);
                }
            });
        });
    }
}

class SupprimerUnPokemon{
    constructor(id){
        this.id = id;
    }

    static RequeteSupprimerUnPokemon = (id) => {
        return new Promise((resolve, reject) => {
            const requete = `DELETE FROM pokemon WHERE id=?`;

            sql.query(requete, id, (erreur, resultat) => {
                if (erreur) {
                    console.log("Erreur: ", erreur);
                    reject(erreur);
                } else {
                    resolve(resultat);
                }
            });
        });
    }
}

module.exports = {Pokemon, ListePokemon, AjouterUnPokemon, ModifierUnPokemon};
