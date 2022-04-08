import express from 'express';
import path from 'path';

import { marantzRoutes } from './routes';

const port = process.env.PORT || 8585;
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Router Middleware
 * Router - /marantz/*
 * Method - *
 */

app.use('/marantz', marantzRoutes);

app.listen(port);
console.log('Server started');
