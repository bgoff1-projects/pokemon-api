import { NextFunction, Request, Response } from 'express';
import { Pokemon } from '../models/pokemon.model';

export async function getAllPokemon(req: Request, res: Response) {
    res.status(200).json(await Pokemon.find().sort({ pokemonNumber: 1 }));
}

export async function getPokemonFromNumber(req: Request, res: Response, next: NextFunction, pokemonNumber: number) {
    const pokemon = await Pokemon.findOne({ pokemonNumber });
    if (pokemon) {
        res.locals.pokemon = pokemon;
        next();
    } else {
        next();
    }
}

export async function getPokemonFromName(req: Request, res: Response, next: NextFunction, name: string) {
    const pokemon = await Pokemon.findOne({ name });
    if (pokemon) {
        res.locals.pokemon = pokemon;
        next();
    } else {
        next();
    }
}

export async function getImageOfPokemon(req: Request, res: Response) {
    if (res.locals.pokemon) {
        const image = new Buffer(res.locals.pokemon.image, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length
        });
        res.end(image);
    } else {
        res.status(404).json({
            message: 'Could not find that pokemon!'
        });
    }
}
