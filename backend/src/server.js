import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
// import {get} from '../node_modules/mongodb/src/utils';
const app = express ();

const __dirname = path.resolve ();

app.use (express.json ());

app.get ('/books', (req, res) => {
  //   res.send ('Hello World');
  res.status (200).json ({message: 'Hello World'});
});

app.get ('/api', (req, res) => {
  res.status (200).json ({message: 'Hello from API'});
});

if (ENV.NODE_ENV === 'production') {
  app.use (express.static (path.join (__dirname, '../frontend/dist')));

  app.get ('/{*any}', (req, res) => {
    res.sendFile (path.join (__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen (ENV.PORT || 3000, () => {
  console.log (
    `Server is running on port http://localhost:${ENV.PORT || 3000}`
  );
});
