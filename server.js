import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import dbConfig from './src/configs/db.js';
import routes from './src/routes/index.js';
import './src/services/jwtStrategy.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

// TODO: Security, Error Handling, Data Validation, Github Ruleset, CI/CD, Logging

mongoose
  .connect(dbConfig.url)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.use('/', routes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${port}/api`);
});
