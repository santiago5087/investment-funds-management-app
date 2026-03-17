// api/index.js - Vercel Serverless Function para json-server
const jsonServer = require('json-server');
const path = require('path');
const sendEmailHandler = require('./send-email');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults({
  noCors: false
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rewrite /api/* to /*
server.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace('/api', '');
  }
  next();
});

// Handle /send-email endpoint before json-server routes
server.use('/send-email', (req, res) => {
  return sendEmailHandler(req, res);
});

server.use(router);

module.exports = server;
