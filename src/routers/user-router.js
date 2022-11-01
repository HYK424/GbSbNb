import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userController } from '../controllers/user-controller';
import { loginAuthenticator } from '../middlewares/authentication';
import { userValidator } from '../middlewares/validation/index';

const userRouter = Router();

// 회원가입 api (아래는 / 이지만, 실제로는 /api/users 로 요청해야 함.)
userRouter.post(
  '/',
  userValidator.createUser,
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

// 위 api를 제외한 아래 api들은 isLoggedIn를 거치게 됨
userRouter.use(loginAuthenticator.isLoggedIn);

// 로그인한 유저 정보를 가져옴
userRouter.get('/:userId', userController.getUserInfo);

// 사용자 정보 수정
userRouter.put('/:userId', userValidator.updateUser, userController.updateUser);

// 사용자 삭제
userRouter.delete('/:userId', userController.deleteUser);

// 로그아웃
// 로그아웃 요청시 쿠키 삭제
//userRouter.get('/logout', userController.logOut); //로그아웃은.....프론트가 한다!!

export { userRouter };
