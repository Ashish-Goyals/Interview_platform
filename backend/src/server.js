import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import { fileURLToPath } from 'url';
import {serve} from 'inngest/express';
import { inngest, functions } from "./lib/inngest.js"
import cors from "cors";
const app = express();
const {connectDB} = await import('./lib/db.js');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
 
app.use('/api/inngest', serve({client:inngest, functions}));

app.get('/books', (req, res) => {
  res.status(200).json({message: 'Hello World'});
});

app.get('/api', (req, res) => {
  res.status(200).json({message: 'Hello from API'});
});

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log('Error', error);
  }
};

startServer();