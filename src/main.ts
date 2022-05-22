import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { marantzRoutes, magicHome } from './routes';

const port = process.env.PORT || 8585;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Router Middleware
 * Router - /marantz/*
 * Method - *
 */

app.use('/marantz', marantzRoutes);

/**
 * Router Middleware
 * Router - /mhome/*
 * Method - *
 */

app.use('/mhome', magicHome);

app.listen(port).then(() => console.log(`Server listening on port ${port}`));
