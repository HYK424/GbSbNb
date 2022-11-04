import cors from 'cors';
import express from 'express';
import {
  viewsRouter,
  userRouter,
  productRouter,
  categoryRouter,
  adminRouter,
} from './routers';
import {
  notFoundErrorHandler,
  errorHandler,
  appErrorHandler,
} from './middlewares';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);

// 백엔드 라우터
app.use('/api/users', userRouter);

app.use('/api/admin', adminRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use(notFoundErrorHandler);
app.use(errorHandler);
app.use(appErrorHandler);

export { app };

//토큰에 role을 담아서 사용.
