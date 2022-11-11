import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const orderRouter = Router();

orderRouter.post('/unknown', asyncHandler(orderController.getOrderByUnknown));
orderRouter.post('/unknown', asyncHandler(orderController.createOrder));
orderRouter.delete(
  '/unknownCancel',
  asyncHandler(orderController.unknownUserOrderCancel),
);

orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.post('/', asyncHandler(orderController.createOrder));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));
orderRouter.get('/:orderId/cancel', asyncHandler(orderController.cancelOrder));

export { orderRouter };
