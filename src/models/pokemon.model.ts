import { readFile } from 'fs';

const POKEMON: Pokemon[] = [];

interface IPokemon {
    name: string;
    types: string[];
    games: string[];
    generation: number;
    image: any;
    pokemonNumber: number;
}

interface PokemonFromJSON {
    name: string;
    types: string[];
    games: string[];
    generation: number;
    number: number;
}

class Pokemon implements IPokemon {
    name: string;
    types: string[];
    games: string[];
    generation: number;
    image: any;
    pokemonNumber: number;

    constructor(data: IPokemon) {
        this.name = data.name;
        this.types = data.types;
        this.games = data.games;
        this.generation = data.generation;
        this.image = data.image;
        this.pokemonNumber = data.pokemonNumber;
    }
}

function createPokemon(pokemon: PokemonFromJSON) {
    let name: string;
    if (pokemon.name.includes('alolan ')) {
        const n = pokemon.name.split(' ');
        name = n[0].charAt(0).toUpperCase() + n[0].substring(1) + n[1].charAt(0).toUpperCase() + n[1].substring(1);
    } else {
        name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    }
    const types = arrayManipulate(pokemon.types);
    const games = arrayManipulate(pokemon.games);
    const generation = pokemon.generation;
    const pokemonNumber = pokemon.number;
    readFile(`./images/${pokemonNumber}.png`, (err, img) => {
        const image = img.toString('base64');
        const myPokemon = new Pokemon({ name, types, games, generation, pokemonNumber, image });
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
