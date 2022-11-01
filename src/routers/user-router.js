import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userController } from '../controllers/user-controller';
import { loginAuthenticator } from '../middlewares/authentication';
import { userValidator } from '../middlewares/validation/user-validator';

const userRouter = Router();

// 회원가입 api (아래는 / 이지만, 실제로는 /api/users 로 요청해야 함.)
userRouter.post(
  '/',
  userValidator.signUp,
  loginAuthenticator.isNotLoggedIn,
  userController.createUser,
);

// 로그인 api (아래는 /login 이지만, 실제로는 /api/users/login 로 요청해야 함.)
userRouter.post(
  '/login',
  userValidator.login,
  loginAuthenticator.isNotLoggedIn,
  userController.logIn,
);

// 로그아웃
// 로그아웃 요청시 쿠키 삭제
userRouter.get('/logout', userController.logOut);

// 위 api를 제외한 아래 api들은 isLoggedIn를 거치게 됨
userRouter.use(loginAuthenticator.isLoggedIn);

// 전체 유저 목록을 가져옴 (배열 형태임)
userRouter.get('/', userController.getAllUsers);

// 사용자 정보 수정
userRouter.put('/:userId', userController.updateUser);

export { userRouter };
