import { Router } from 'express';
import { orderController } from '../../controllers/order-controller';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userController } from '../../controllers/user-controller';
import { loginAuthenticator } from '../../middlewares/authentication';
import { userValidator } from '../../middlewares/validation/index';

const userRouter = Router();

//////// 계정관련 ////////
//회원가입
userRouter.post(
  '/',
  userValidator.createUser,
  loginAuthenticator.isNotLoggedIn,
  userController.createUser,
  userController.logIn,
);

//로그인
userRouter.post(
  '/login',
  userValidator.login,
  loginAuthenticator.isNotLoggedIn,
  userController.logIn,
);

//로그인 검증
userRouter.use(loginAuthenticator.isLoggedIn);

//내 계정정보
userRouter.get('/myinfo', userController.getMyInfo);

//내 비밀번호 변경
userRouter.put(
  '/myinfo/password',
  userValidator.checkPassword,
  userController.changePassword,
);

//내 계정정보 변경
userRouter.put('/myinfo', userValidator.updateUser, userController.updateUser);

//회원 탈퇴
userRouter.delete(
  '/myinfo/delete',
  userValidator.deleteUser,
  userController.deleteUser,
);
//////// 계정관련 ////////

//////// 주문관련 ////////
userRouter.post('/myorder', orderController.createMyOrders);

userRouter.get('/myorder', orderController.getMyOrders);

//////// 주문관련 ////////
export { userRouter };
