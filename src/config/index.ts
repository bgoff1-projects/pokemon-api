export const serverPort = process.env.PORT || 8000;

export const logFormat = 'dev';

export const reactURL = process.env.reactURL ||  'https://bgoff1-projects.github.io';
export const devURL = 'http://localhost:3000';
export const CORSMethods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
export const CORSHeaders = 'X-Requested-With,Content-Type';

import { Response, Request, NextFunction } from 'express';

export function allowCORS(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', reactURL);
    res.setHeader('Access-Control-Allow-Methods', CORSMethods);
    res.setHeader('Access-Control-Allow-Headers', CORSHeaders);
    next();
}
