import express from 'express';
import { urlencoded, json, } from "body-parser";
import Router from './routes';

const app = express();
const port = 3000;

app.use(urlencoded({
  limit: "12mb", extended: true,
}));
app.use(json({
  limit: "12mb",
}));
app.use(Router);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
