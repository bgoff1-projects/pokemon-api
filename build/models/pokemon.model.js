"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPokemon_1 = require("../config/createPokemon");
class Pokemon {
    constructor(data) {
        this.name = data.name;
        this.types = data.types;
        this.games = data.games;
        this.generation = data.generation;
        this.image = data.image;
        this.pokemonNumber = data.pokemonNumber;
        this.locations = {};
    }
}
exports.Pokemon = Pokemon;
exports.default = createPokemon_1.default;
