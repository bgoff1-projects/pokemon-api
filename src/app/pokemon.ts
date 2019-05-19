import { Request, Response } from 'express';
import pokemon from '../models/pokemon.model';

export async function getAllPokemon(req: Request, res: Response) {
  let result = [];
  const pokes = await pokemon.sort((a, b) => a.pokemonNumber - b.pokemonNumber);
  if (req.query.image) {
    for (const poke of pokes) {
      result.push({
        name: poke.name,
        types: poke.types,
        games: poke.games,
        generation: poke.generation,
        number: poke.pokemonNumber,
        locations: poke.locations
      });
    }
  } else {
    result = pokemon;
  }
    res.status(200).json(result);
}

export async function getAllPokemon2(req: Request, res: Response) {
    res.status(200).json({'pokemon': await pokemon.sort((a,b) => a.pokemonNumber - b.pokemonNumber)});
}

// export async function getPokemonFromNumber(req: Request, res: Response, next: NextFunction, pokemonNumber: number) {
//     const pokemon = await Pokemon.findOne({ pokemonNumber });
//     if (pokemon) {
//         res.locals.pokemon = pokemon;
//         next();
//     } else {
//         next();
//     }
// }
//
// export async function getPokemonFromName(req: Request, res: Response, next: NextFunction, name: string) {
//     const pokemon = await Pokemon.findOne({ name });
//     if (pokemon) {
//         res.locals.pokemon = pokemon;
//         next();
//     } else {
//         next();
//     }
// }
//
// export async function getImageOfPokemon(req: Request, res: Response) {
//     if (res.locals.pokemon) {
//         const image = new Buffer(res.locals.pokemon.image, 'base64');
//         res.writeHead(200, {
//             'Content-Type': 'image/png',
//             'Content-Length': image.length
//         });
//         res.end(image);
//     } else {
//         res.status(404).json({
//             message: 'Could not find that pokemon!'
//         });
//     }
// }
