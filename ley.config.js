const { postgresConfig, setEnvironmentVariables } = require('./util/config.js');

setEnvironmentVariables();

module.exports = postgresConfig;
