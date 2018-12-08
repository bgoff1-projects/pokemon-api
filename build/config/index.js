"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverPort = 8000;
exports.logFormat = 'dev';
exports.database = {
    user: 'username',
    pass: 'password',
    host: 'localhost',
    name: 'pokemon',
};
exports.iterations = 10000;
exports.keyLength = 256;
exports.digest = 'sha512';
exports.mongoCollection = 'pokemon';
exports.angularURL = process.env.angularURL || 'http://localhost:3000';
exports.CORSMethods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
exports.CORSHeaders = 'X-Requested-With,Content-Type';
function allowCORS(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', exports.angularURL);
    res.setHeader('Access-Control-Allow-Methods', exports.CORSMethods);
    res.setHeader('Access-Control-Allow-Headers', exports.CORSHeaders);
    next();
}
exports.allowCORS = allowCORS;
