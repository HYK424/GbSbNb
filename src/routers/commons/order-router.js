import { Router } from 'express';
import { OrderController } from '../../controllers';
import { authenticator } from '../../middlewares/authentication';
import { checkRole } from '../../middlewares/authorization';

const orderRouter = Router();

orderRouter.get('/', OrderController.getOrders);
//orderRouter.get('/myorders', OrderController.getMyOrders);
orderRouter.use(authenticator.isLoggedIn, checkRole);

export { orderRouter };
