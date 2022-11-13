import { Router } from 'express';
import { OrderController } from '../../controllers';
import { authenticator, checkRole } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const adminOrderRouter = Router();

adminOrderRouter.use(authenticator.isLoggedIn, checkRole);
adminOrderRouter.get('/', asyncHandler(OrderController.getOrders));
adminOrderRouter.put('/', asyncHandler(OrderController.updateOrderStatus));
adminOrderRouter.delete('/:orderId', asyncHandler(OrderController.deleteOrder));

export { adminOrderRouter };
