import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import { allowCORS, logFormat } from '../config';

import { router } from './routes';

export const app = express();

// Logging
if (logFormat) {
    app.use(morgan(logFormat));
}

// POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(allowCORS);

app.use('/', router);
