import { readFile } from 'fs';

const POKEMON: Pokemon[] = [];

interface IPokemon {
    name: string;
    types: string[];
    region: string[];
    generation: number;
    image: any;
    pokemonNumber: number;
}

class Pokemon implements IPokemon {
    name: string;
    types: string[];
    region: string[];
    generation: number;
    image: any;
    pokemonNumber: number;

    constructor(data: IPokemon) {
        this.name = data.name;
        this.types = data.types;
        this.region = data.region;
        this.generation = data.generation;
        this.image = data.image;
        this.pokemonNumber = data.pokemonNumber;
    }
}

function createPokemon(pokemon: any) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    const types = arrayManipulate(pokemon.types);
    const region = arrayManipulate(pokemon.region);
    const generation = pokemon.generation;
    const pokemonNumber = pokemon.number;
    readFile(`./images/${pokemonNumber}.png`, (err, img) => {
        const image = img.toString('base64');
        const myPokemon = new Pokemon({ name, types, region, generation, pokemonNumber, image });
        POKEMON.push(myPokemon);
    });
}

function arrayManipulate(arr: string[]): string[] {
    const result = [];
    for (const i of arr) {
        result.push(i[0].toUpperCase() + i.substring(1));
    }
    return result;
}

readFile('./src/config/pokemon.json', (err1, data) => {
    if (err1) {
        console.error(err1);
    }
    addPokemon(data);
});

function addPokemon(data: any) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
        createPokemon(poke);
    }
}

export const pokemon = POKEMON;
