import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userController } from '../controllers/user-controller';
import { loginAuthenticator } from '../middlewares/authentication';
import { userValidator } from '../middlewares/validation/index';

const userRouter = Router();

userRouter.post(
  '/',
  userValidator.createUser,
  loginAuthenticator.isNotLoggedIn,
  userController.createUser,
);

userRouter.post(
  '/login',
  userValidator.login,
  loginAuthenticator.isNotLoggedIn,
  userController.logIn,
);

userRouter.use(loginAuthenticator.isLoggedIn);

userRouter.get('/:userId', userController.getUserInfo);

userRouter.post(
  '/:userId/password',
  userValidator.checkPassword,
  userController.changePassword,
);

userRouter.put('/:userId', userValidator.updateUser, userController.updateUser);

userRouter.delete(
  '/:userId/delete',
  userValidator.deleteUser,
  userController.deleteUser,
);

export { userRouter };
