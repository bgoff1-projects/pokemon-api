"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemon = require("./pokemon");
exports.router = express_1.Router();
// router.param('number', pokemon.getPokemonFromNumber);
// router.param('name', pokemon.getPokemonFromName);
exports.router.get('/pokemon', pokemon.getAllPokemon);
exports.router.get('/pokemon-mobile', pokemon.getAllPokemon2);
// router.get('/image/:number', pokemon.getImageOfPokemon);