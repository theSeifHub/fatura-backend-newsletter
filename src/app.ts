import express from 'express';
import { urlencoded, json, } from "body-parser";
import { createConnection, Connection } from "typeorm";
import Router from './routes';
import config from "./config";

const app = express();

app.use(urlencoded({
  limit: "12mb", extended: true,
}));
app.use(json({
  limit: "12mb",
}));
app.use(Router);

async function setupDb(): Promise<Connection> {
  const connection = await createConnection(config.DB.CONNECTION_NAME as string);
  console.log(`connected to database. Connection: ${connection.name} / ${connection.options.database}`);
  return connection;
}

function startServer(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    app.listen(config.PORT, () => {
      console.log(`server started on port ${config.PORT} (${config.ENV})`);
      resolve(true);
    });
  });
}

setupDb().then(async () => {
  await startServer();
});