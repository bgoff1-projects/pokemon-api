import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import { allowCORS, logFormat, mongoCollection } from '../config';
import { connect } from 'mongoose';

import { router } from './routes';

export const app = express();

// Logging
if (logFormat) {
    app.use(morgan(logFormat));
}

connect(`mongodb://localhost:27017/${mongoCollection}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(async () => {
        console.log('Connected to the database!');
    })
    .catch((err: any) => console.log(`Database connection error: ${err.message}`));

// POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(allowCORS);

app.use('/', router);
