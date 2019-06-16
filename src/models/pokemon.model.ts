import { Location } from './location.model';
import pokemon from '../config/createPokemon';

export interface IPokemon {
    name: string;
    types: string[];
    games: string[];
    generation: number;
    pokemonNumber: number;
}

export interface PokemonFromJSON {
    name: string;
    types: string[];
    games: string[];
    generation: number;
    number: number;
    locations: Location
}

export class Pokemon implements IPokemon {
    name: string;
    types: string[];
    games: string[];
    generation: number;
    pokemonNumber: number;
    locations: Location;

    constructor(data: IPokemon) {
        this.name = data.name;
        this.types = data.types;
        this.games = data.games;
        this.generation = data.generation;
        this.pokemonNumber = data.pokemonNumber;
        this.locations = {}
    }
}

export default pokemon;
