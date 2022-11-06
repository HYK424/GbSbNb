import { Router } from 'express';
import { adminController } from '../../controllers/admin-controller';
import { loginAuthenticator } from '../../middlewares/authentication';
import { checkRole } from '../../middlewares/authorization';

const orderRouter = Router();
//어드민 로그인, 권한 검증
orderRouter.use(loginAuthenticator.isLoggedIn, checkRole);

//전체 배송 조회
//orderRouter.get('/myorders', adminController.getMyOrders);

export { orderRouter };
