// import path from 'node:path';
// import { createRequestHandler } from '@expo/server/adapter/vercel';

// export default createRequestHandler({
//   build: path.join(__dirname, '../dist/server'),
// });
// api/index.ts



const path = require('node:path');
const { createRequestHandler } = require('@expo/server/adapter/vercel');

const handler = createRequestHandler({
  build: path.join(__dirname, '../dist/server'),
});

module.exports = handler;
