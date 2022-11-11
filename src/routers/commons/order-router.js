import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const orderRouter = Router();

orderRouter.post('/unknown', asyncHandler(orderController.getOrderByUnknown));
orderRouter.post('/', asyncHandler(orderController.createOrder));

orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));
orderRouter.get('/:orderId/cancel', asyncHandler(orderController.cancelOrder));

export { orderRouter };
