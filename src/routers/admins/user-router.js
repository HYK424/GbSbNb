import { Router } from 'express';
import { adminController } from '../../controllers/admin-controller';
import { authenticator, checkRole, asyncHandler } from '../../middlewares';

const adminRouter = Router();

adminRouter.use(authenticator.isLoggedIn, checkRole);

//모든 유저 검색
adminRouter.get('/allusers', asyncHandler(adminController.getAllUsers));

//지정 유저 권한 변경
adminRouter.put('/allusers', asyncHandler(adminController.updateUserRole));

//지정 유저 정보 확인
adminRouter.get('/allusers/:userId', asyncHandler(adminController.getUserInfo));

//지정 유저 정보 강제 변경
adminRouter.put(
  '/allusers/:userId',
  asyncHandler(adminController.forceChangeUserInfo),
);

//지정 유저 비밀번호 초기화
adminRouter.get(
  '/allusers/:userId/password',
  asyncHandler(adminController.resetPassword),
);

export { adminRouter };
