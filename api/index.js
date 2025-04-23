// import path from 'node:path';
// import { createRequestHandler } from '@expo/server/adapter/vercel';

// export default createRequestHandler({
//   build: path.join(__dirname, '../dist/server'),

// });


// import path from 'node:path';
// import { createRequestHandler } from '@expo/server/adapter/vercel';

// export default createRequestHandler({
//   build: path.join(__dirname, '../dist/server'),
// });


const path = require('node:path');
const { createRequestHandler } = require('@expo/server/adapter/vercel');

module.exports = createRequestHandler({
  build: path.join(__dirname, '../dist/server'),
});
