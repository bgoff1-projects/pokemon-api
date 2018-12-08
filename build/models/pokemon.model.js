"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fs_1 = require("fs");
exports.pokemonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    types: {
        type: [String],
        required: true
    },
    region: [String],
    generation: Number,
    image: mongoose_1.Schema.Types.Mixed,
    pokemonNumber: Number
}, {
    toJSON: {
        transform: (doc, ret) => {
            return {
                name: ret.name,
                number: ret.pokemonNumber,
                types: ret.types,
                region: ret.region,
                image: ret.image
            };
        }
    }
});
exports.Pokemon = mongoose_1.model('Pokemon', exports.pokemonSchema);
async function createPokemon(pokemon) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    const types = arrayManipulate(pokemon.types);
    const region = arrayManipulate(pokemon.region);
    const pokemonNumber = pokemon.number;
    await fs_1.readFile(`./images/${pokemonNumber}.png`, async (err, img) => {
        const image = img.toString('base64');
        const myPokemon = new exports.Pokemon({ name, types, region, pokemonNumber, image });
        await myPokemon.save();
    });
}
function arrayManipulate(arr) {
    const result = [];
    for (const i of arr) {
        result.push(i[0].toUpperCase() + i.substring(1));
    }
    return result;
}
exports.Pokemon.estimatedDocumentCount(async (err, count) => {
    console.log(count);
    if (count === 0) {
        await fs_1.readFile('./src/config/pokemon.json', async (err1, data) => {
            if (err1) {
                console.error(err1);
            }
            await addPokemon(data);
        });
    }
});
async function addPokemon(data) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
        await createPokemon(poke);
    }
}
