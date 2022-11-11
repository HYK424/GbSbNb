import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

import { orderValidator } from '../../middlewares';

const orderRouter = Router();

orderRouter.get(
  '/unknown',
  orderValidator.unknownUser,
  asyncHandler(orderController.getUnknownOrder),
);
orderRouter.delete(
  '/unknownCancel',
  asyncHandler(orderController.unknownUserOrderCancel),
);

orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.post('/', asyncHandler(orderController.createOrder));
orderRouter.get('/:orderId', asyncHandler(orderController.getOrder));
orderRouter.put('/:orderId', asyncHandler(orderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));
orderRouter.get('/:orderId/cancel', asyncHandler(orderController.cancelOrder));

export { orderRouter };
