

const path = require('node:path');
const { createRequestHandler } = require('@expo/server/adapter/vercel');

module.exports = createRequestHandler({
  build: path.join(__dirname, '../dist/server'),
});
