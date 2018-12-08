import { Document, model, Schema } from 'mongoose';
import { PokemonTypes, Regions } from '../types';
import { readFile } from 'fs';

interface IPokemon extends Document {
    name: string;
    types: [PokemonTypes, PokemonTypes | undefined];
    region: [Regions];
    generation: number;
    image: any;
    pokemonNumber: number;
}

export const pokemonSchema = new Schema({
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
    image: Schema.Types.Mixed,
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

export const Pokemon = model<IPokemon>('Pokemon', pokemonSchema);

async function createPokemon(pokemon: any) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    const types = arrayManipulate(pokemon.types);
    const region = arrayManipulate(pokemon.region);
    const pokemonNumber = pokemon.number;
    await readFile(`./images/${pokemonNumber}.png`, async (err, img) => {
        const image = img.toString('base64');
        const myPokemon = new Pokemon({ name, types, region, pokemonNumber, image });
        await myPokemon.save();
    });
}

function arrayManipulate(arr: string[]): string[] {
    const result = [];
    for (const i of arr) {
        result.push(i[0].toUpperCase() + i.substring(1));
    }
    return result;
}

Pokemon.estimatedDocumentCount(async (err, count) => {
    console.log(count);
    if (count === 0) {
        await readFile('./src/config/pokemon.json', async (err1, data) => {
            if (err1) {
                console.error(err1);
            }
            await addPokemon(data);
        });
    }
});

async function addPokemon(data: any) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
        await createPokemon(poke);
    }
}
