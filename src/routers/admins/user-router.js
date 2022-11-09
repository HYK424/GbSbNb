import { Router } from 'express';
import { adminController } from '../../controllers/admin-controller';
import { OrderController } from '../../controllers/order-controller';
import { authenticator } from '../../middlewares';
import { checkRole } from '../../middlewares';

const adminRouter = Router();

adminRouter.use(authenticator.isLoggedIn, checkRole);

//모든 유저 검색
adminRouter.get('/allusers', adminController.getAllUsers);

//지정 유저 권한 변경
adminRouter.put('/allusers', adminController.updateUserRole);

//지정 유저 정보 확인
adminRouter.get('/allusers/:userId', adminController.getUserInfo);

//지정 유저 정보 강제 변경
adminRouter.put('/allusers/:userId', adminController.forceChangeUserInfo);

//지정 유저 비밀번호 초기화
adminRouter.get('/allusers/:userId/password', adminController.resetPassword);

adminRouter.get('/orders', OrderController.getOrders);

export { adminRouter };
