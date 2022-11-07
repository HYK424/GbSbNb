import { Router } from 'express';
import { adminController } from '../../controllers/admin-controller';
import { authenticator } from '../../middlewares/authentication';
import { checkRole } from '../../middlewares/authorization';

const orderRouter = Router();
//어드민 로그인, 권한 검증
orderRouter.use(authenticator.isLoggedIn, checkRole);

//전체 배송 조회
//orderRouter.get('/myorders', adminController.getMyOrders);

export { orderRouter };
