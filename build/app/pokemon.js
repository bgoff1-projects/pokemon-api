"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_model_1 = require("../models/pokemon.model");
async function getAllPokemon(req, res) {
    res.status(200).json(await pokemon_model_1.Pokemon.find().sort({ pokemonNumber: 1 }));
}
exports.getAllPokemon = getAllPokemon;
async function getPokemonFromNumber(req, res, next, pokemonNumber) {
    const pokemon = await pokemon_model_1.Pokemon.findOne({ pokemonNumber });
    if (pokemon) {
        res.locals.pokemon = pokemon;
        next();
    }
    else {
        next();
    }
}
exports.getPokemonFromNumber = getPokemonFromNumber;
async function getPokemonFromName(req, res, next, name) {
    const pokemon = await pokemon_model_1.Pokemon.findOne({ name });
    if (pokemon) {
        res.locals.pokemon = pokemon;
        next();
    }
    else {
        next();
    }
}
exports.getPokemonFromName = getPokemonFromName;
async function getImageOfPokemon(req, res) {
    if (res.locals.pokemon) {
        const image = new Buffer(res.locals.pokemon.image, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length
        });
        res.end(image);
    }
    else {
        res.status(404).json({
            message: 'Could not find that pokemon!'
        });
    }
}
exports.getImageOfPokemon = getImageOfPokemon;
