"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemon = require("./pokemon");
exports.router = express_1.Router();
exports.router.param('number', pokemon.getPokemonFromNumber);
exports.router.param('name', pokemon.getPokemonFromName);
exports.router.get('/pokemon', pokemon.getAllPokemon);
exports.router.get('/image/:number', pokemon.getImageOfPokemon);
