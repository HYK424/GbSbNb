import cors from 'cors';
import express from 'express';

import {
  notFoundErrorHandler,
  errorHandler,
  appErrorHandler,
} from './middlewares';

import { router } from './routers';

import { viewsRouter } from './routers';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);

app.use('/api', router);

app.use(notFoundErrorHandler);
app.use(errorHandler);
app.use(appErrorHandler);

export { app };
