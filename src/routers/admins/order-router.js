import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator, checkRole } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const adminOrderRouter = Router();

adminOrderRouter.use(authenticator.isLoggedIn, checkRole);

adminOrderRouter.put('/', asyncHandler(orderController.updateOrderStatus));
adminOrderRouter.delete('/:orderId', asyncHandler(orderController.deleteOrder));

export { adminOrderRouter };
