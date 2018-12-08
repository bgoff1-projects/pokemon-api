"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function connect(collectionName, printMessage) {
    mongoose_1.connect(`mongodb://localhost:27017/${collectionName}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
        if (printMessage) {
            console.log('Connected to the database!');
        }
    })
        .catch((err) => console.log(`Database connection error: ${err.message}`));
}
exports.connect = connect;
function disconnect(printMessage) {
    return mongoose_1.disconnect()
        .then(() => {
        if (printMessage) {
            console.log('Disconnected from the database!');
        }
    });
}
exports.disconnect = disconnect;
