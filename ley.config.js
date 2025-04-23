const { postgresConfig, setEnvironmentVariables } = require('./util/config.js');


setEnvironmentVariables();

export default postgresConfig;
