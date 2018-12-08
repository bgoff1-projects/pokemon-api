export const serverPort = 8000;

export const logFormat = 'dev';

export const database = {
    user: 'username',
    pass: 'password',
    host: 'localhost',
    name: 'pokemon',
};
export const iterations = 10000;
export const keyLength = 256;
export const digest = 'sha512';
export const mongoCollection = 'pokemon';

export const angularURL = process.env.angularURL || 'http://localhost:3000';
export const CORSMethods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
export const CORSHeaders = 'X-Requested-With,Content-Type';

import { Response, Request, NextFunction } from 'express';

export function allowCORS(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', angularURL);
    res.setHeader('Access-Control-Allow-Methods', CORSMethods);
    res.setHeader('Access-Control-Allow-Headers', CORSHeaders);
    next();
}
