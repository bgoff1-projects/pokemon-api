"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const config_1 = require("../config");
const mongoose_1 = require("mongoose");
const routes_1 = require("./routes");
exports.app = express();
// Logging
if (config_1.logFormat) {
    exports.app.use(morgan(config_1.logFormat));
}
mongoose_1.connect(`mongodb://localhost:27017/${config_1.mongoCollection}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(async () => {
    console.log('Connected to the database!');
})
    .catch((err) => console.log(`Database connection error: ${err.message}`));
// POST data
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(bodyParser.json());
exports.app.use(config_1.allowCORS);
exports.app.use('/', routes_1.router);
