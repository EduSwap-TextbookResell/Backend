import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes/routes.js';
import mongoose from 'mongoose';
import dbConfig from './src/configs/db.config.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// TODO: Docker, Security, Error Handling, Auth, Github Ruleset, CI/CD

mongoose
  .connect(dbConfig.url)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

routes(app);

app.listen(port, '127.0.0.1', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
