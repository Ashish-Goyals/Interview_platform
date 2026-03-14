import express from 'express';
import {ENV} from './lib/env.js';

const app = express ();

app.get ('/', (req, res) => {
  //   res.send ('Hello World');
  res.status (200).json ({message: 'Hello World'});
});

app.listen (ENV.PORT || 3000, () => {
  console.log (
    `Server is running on port http://localhost:${ENV.PORT || 3000}`
  );
});
