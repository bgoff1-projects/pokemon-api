import { connect as mongoConnect, disconnect as mongoDisconnect } from 'mongoose';

export async function connect(collectionName: string, printMessage?: boolean) {
    mongoConnect(`mongodb://localhost:27017/${collectionName}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
            if (printMessage) {
                console.log('Connected to the database!');
            }
        })
        .catch((err: any) => console.log(`Database connection error: ${err.message}`));
}

export function disconnect(printMessage?: boolean) {
    return mongoDisconnect()
        .then(() => {
            if (printMessage) {
                console.log('Disconnected from the database!');
            }
        });
}
