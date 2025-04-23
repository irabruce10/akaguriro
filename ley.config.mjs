// ley.config.mjs (ESM)
import { postgresConfig, setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

export default postgresConfig;
