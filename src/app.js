import cors from 'cors';
import express from 'express';
import {
  viewsRouter,
  userRouter,
  productRouter,
  categoryRouter,
  adminRouter,
} from './routers';
import { errorHandler } from './middlewares';

import { loginAuthenticator } from './middlewares/authentication';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
//로그인이 되어있어야하고, admin role을 보유한 상태에서 아래 api에 접근가능하게 작성

app.use('/api/admin', loginAuthenticator.isLoggedIn, adminRouter);

app.use(errorHandler);

export { app };

//토큰에 role을 담아서 사용.
