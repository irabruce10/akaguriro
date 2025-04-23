// ley.config.js (ESM)
import { postgresConfig, setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

export default postgresConfig;
