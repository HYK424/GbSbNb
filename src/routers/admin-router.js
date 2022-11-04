import { Router } from 'express';
import { adminController } from '../controllers/admin-controller';
import { loginAuthenticator } from '../middlewares/authentication';
import { checkRole } from '../middlewares/authorization';

const adminRouter = Router();
//어드민 로그인, 권한 검증
adminRouter.use(loginAuthenticator.isLoggedIn, checkRole);

//모든 유저 검색
adminRouter.get('/allusers', adminController.getAllUsers);

//지정 유저 정보 확인
adminRouter.get('/allusers/:userId', adminController.getUserInfo);

//지정 유저 정보 강제 변경
adminRouter.put('/allusers/:userId', adminController.forceChangeUserInfo);

//지정 유저 비밀번호 초기화
adminRouter.get('/allusers/:userId/password', adminController.resetPassword);

/////////////////////////////

//전체 배송 조회
adminRouter.get('/shipping', adminController.getShipping);

//배송 정보 변경
adminRouter.put('/shipping/:shippingId/:state');

//재고 조회
adminRouter.get('/inventory');

//재고 변경
adminRouter.put('/inventory');

export { adminRouter };
