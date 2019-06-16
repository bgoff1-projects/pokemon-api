import { Pokemon, PokemonFromJSON } from '../models/pokemon.model';
import { Location } from '../models/location.model';
import { readFile } from 'fs';

const POKEMON: Pokemon[] = [];

function createPokemon(pokemon: PokemonFromJSON) {
    let name: string;
    const alolan = pokemon.name.includes('alolan ');

    const types = arrayManipulate(pokemon.types);
    const games = arrayManipulate(pokemon.games);
    const generation = pokemon.generation;
    const pokemonNumber = pokemon.number;

    if (alolan) {
        const n = pokemon.name.split(' ');
        name = n[0].charAt(0).toUpperCase() + n[0].substring(1) + ' ' + n[1].charAt(0).toUpperCase() + n[1].substring(1);
    } else {
        name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    }

    const myPokemon = new Pokemon({name, types, games, generation, pokemonNumber });
    POKEMON.push(myPokemon);
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

    readFile('./src/config/pokemon_locations.json', (err2, data) => {
        if (err2) {
            console.error(err2);
        }
        fixLocations(data);
    });
});

function addPokemon(data: any) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
        createPokemon(poke);
    }
}

function fixLocation(name: string, locations: Location) {
    for (const item of POKEMON) {
        if (item.name === name) {
            item.locations = locations;
            return;
        }
    }
}

function fixLocations(data: any) {
    const pokemon = JSON.parse(data.toString()).pokemon;
    for (const poke of pokemon) {
      let name = '';
      if (poke.name.includes('alolan')) {
        const n = poke.name.split(' ');
        name = n[0].charAt(0).toUpperCase() + n[0].substring(1) + ' ' + n[1].charAt(0).toUpperCase() + n[1].substring(1);
      } else {
        name = poke.name[0].toUpperCase() + poke.name.substring(1);
      }
        fixLocation(name, poke.locations);
    }
}

export default POKEMON;
