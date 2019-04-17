"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_model_1 = require("../models/pokemon.model");
const fs_1 = require("fs");
const POKEMON = [];
function createPokemon(pokemon) {
    let name;
    let filePath;
    const alolan = pokemon.name.includes('alolan ');
    const types = arrayManipulate(pokemon.types);
    const games = arrayManipulate(pokemon.games);
    const generation = pokemon.generation;
    const pokemonNumber = pokemon.number;
    if (alolan) {
        const n = pokemon.name.split(' ');
        name = n[0].charAt(0).toUpperCase() + n[0].substring(1) + ' ' + n[1].charAt(0).toUpperCase() + n[1].substring(1);
        filePath = `./images/${pokemonNumber}-alola.png`;
    }
    else {
        name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
        filePath = `./images/${pokemonNumber}.png`;
    }
    fs_1.readFile(filePath, (err, img) => {
        if (img) {
            const image = img.toString('base64');
            const myPokemon = new pokemon_model_1.Pokemon({ name, types, games, generation, pokemonNumber, image });
            POKEMON.push(myPokemon);
        }
        else {
            console.log(err);
        }
    });
}
function arrayManipulate(arr) {
    const result = [];
    for (const i of arr) {
        result.push(i[0].toUpperCase() + i.substring(1));
    }
    return result;
}
fs_1.readFile('./src/config/pokemon.json', (err1, data) => {
    if (err1) {
        console.error(err1);
    }
    addPokemon(data);
    fs_1.readFile('./src/config/pokemon_locations.json', (err2, data) => {
        if (err2) {
            console.error(err2);
        }
        fixLocations(data);
    });
});
function addPokemon(data) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
        createPokemon(poke);
    }
}
function fixLocation(name, locations) {
    for (const item of POKEMON) {
        if (item.name === name) {
            // @ts-ignore
            item.locations = locations;
            return;
        }
    }
}
function fixLocations(data) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
        const name = poke.name[0].toUpperCase() + poke.name.substring(1);
        fixLocation(name, poke.locations);
    }
}
exports.default = POKEMON;
