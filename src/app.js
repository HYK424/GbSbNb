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

const app = express();

app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);
// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
//로그인이 되어있어야하고, admin role을 보유한 상태에서 아래 api에 접근가능하게 작성
// app.use('');
app.use('/api/admin', adminRouter);

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };

//토큰에 role을 담아서 사용.
