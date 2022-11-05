import { Router } from 'express';
import { adminController } from '../../controllers/admin-controller';
import { loginAuthenticator } from '../../middlewares/authentication';
import { checkRole } from '../../middlewares/authorization';
console.log('실행됨2');
const admin_userRouter = Router();

admin_userRouter.use(loginAuthenticator.isLoggedIn, checkRole);

//모든 유저 검색
admin_userRouter.get('/allusers', adminController.getAllUsers);

//지정 유저 정보 확인
admin_userRouter.get('/allusers/:userId', adminController.getUserInfo);

//지정 유저 정보 강제 변경
admin_userRouter.put('/allusers/:userId', adminController.forceChangeUserInfo);

//지정 유저 비밀번호 초기화
admin_userRouter.get(
  '/allusers/:userId/password',
  adminController.resetPassword,
);

export { admin_userRouter };
