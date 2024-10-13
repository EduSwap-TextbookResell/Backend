import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import dbConfig from './src/configs/db.config.js';
import routes from './src/routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// TODO: Security, Error Handling, Auth, Github Ruleset, CI/CD, Logging

mongoose
  .connect(dbConfig.url)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use('/', routes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${port}`);
});
