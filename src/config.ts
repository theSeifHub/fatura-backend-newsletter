import * as dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/../.env`,
});

const config = {
  ENV: process.env.NODE_ENVIRONMENT,
  PORT: process.env.PORT,
  DB: {
    CONNECTION_NAME: process.env.DB_CONNECTION_NAME,
    CLIENT: process.env.DB_CLIENT,
    HOST: process.env.DB_HOST,
    DATABASE: process.env.DB_DATABASE,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    MAX_QUERY_EXECUTION_TIME_IN_MS: process.env.DB_MAX_QUERY_EXECUTION_TIME_IN_MS,
    MAX_REQUEST_TIMEOUT_IN_MS: process.env.DB_MAX_REQUEST_TIMEOUT_IN_MS,
  },
};

export default config;
