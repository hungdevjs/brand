const { https } = require('firebase-functions');
const { default: next } = require('next');
const admin = require('firebase-admin');

admin.initializeApp();

const app = next({
  conf: { distDir: '.next' },
});

const handle = app.getRequestHandler();

exports.server = https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
