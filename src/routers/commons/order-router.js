import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

import { orderValidator } from '../../middlewares';

const orderRouter = Router();

orderRouter.get('/:orderId', asyncHandler(orderController.getOrderById));
orderRouter.delete(
  '/unknownCancel',
  asyncHandler(orderController.unknownUserOrderCancel),
);

orderRouter.post('/', asyncHandler(orderController.createOrder));

orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.get('/:orderId', asyncHandler(orderController.getOrder));
orderRouter.put('/:orderId', asyncHandler(orderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));

export { orderRouter };
