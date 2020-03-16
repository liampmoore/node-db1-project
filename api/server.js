const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountsRouter = require('./accounts')

server.use(express.json());

server.use('/api/accounts', accountsRouter)

module.exports = server;
