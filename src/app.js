import cors from 'cors';
import express from 'express';

// import {
//   viewsRouter,
//   userRouter,
//   productRouter,
//   categoryRouter,
//   adminRouter,
// } from './routers';
import { router } from './routers';

import { viewsRouter } from './routers';

import { errorHandler } from './middlewares';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);

// 백엔드 라우터

// app.use('/api/users', userRouter);

app.use('/api', router);

// app.use('/api/products', productRouter);

// app.use('/api/categories', categoryRouter);

// 백엔드 라우터

app.use(errorHandler);

export { app };

//토큰에 role을 담아서 사용.
