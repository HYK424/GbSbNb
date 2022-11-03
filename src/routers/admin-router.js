import { Router } from 'express';
import { adminController } from '../controllers/admin-controller';
import { loginAuthenticator } from '../middlewares/authentication';
import { checkRole } from '../middlewares/authorization';

const adminRouter = Router();
//어드민 로그인, 권한 검증
adminRouter.use(loginAuthenticator.isLoggedIn, checkRole);

//모든 유저 검색
adminRouter.get('/allusers', adminController.getAllUsers);

//전체 배송 조회
adminRouter.get('/shipping');

//배송 정보 변경
adminRouter.put('/shipping');

//재고 조회
adminRouter.get('/inventory');

//재고 변경
adminRouter.put('/inventory');

export { adminRouter };
