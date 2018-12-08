import { Router } from 'express';
import * as pokemon from './pokemon';

export const router = Router();

router.param('number', pokemon.getPokemonFromNumber);
router.param('name', pokemon.getPokemonFromName);
router.get('/pokemon', pokemon.getAllPokemon);
router.get('/image/:number', pokemon.getImageOfPokemon);
