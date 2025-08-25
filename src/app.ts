import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.ts';
import NotFoundError from './errors/NotFoundError.ts';
import { errorMiddleware } from './middlewares/errorMiddleware.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Not found!!'));
});

app.use(errorMiddleware);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.info('Connected to MongoDB!');
    app.listen(PORT, () => {
      console.info(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
