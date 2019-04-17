"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverPort = process.env.PORT || 8000;
exports.logFormat = 'dev';
exports.reactURL = process.env.reactURL || 'https://bgoff1-projects.github.io';
exports.devURL = 'http://localhost:3000';
exports.CORSMethods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
exports.CORSHeaders = 'X-Requested-With,Content-Type';
function allowCORS(req, res, next) {
    if (req.get('host') === 'localhost:8000') {
        res.setHeader('Access-Control-Allow-Origin', exports.devURL);
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', exports.reactURL);
    }
    res.setHeader('Access-Control-Allow-Methods', exports.CORSMethods);
    res.setHeader('Access-Control-Allow-Headers', exports.CORSHeaders);
    next();
}
exports.allowCORS = allowCORS;
