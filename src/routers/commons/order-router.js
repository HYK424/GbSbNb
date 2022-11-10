import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

import { orderValidator } from '../../middlewares';

const orderRouter = Router();

//지워도 됨
orderRouter.post(
  '/orderlookup',
  orderValidator.unknownUser,
  asyncHandler(orderController.unknownUserOrder),
);
orderRouter.delete(
  '/unknownCancel',
  asyncHandler(orderController.unknownUserOrderCancel),
);

orderRouter.post('/', asyncHandler(orderController.createOrder));
// orderRouter.get('/orderId', asyncHandler(OrderController.getOrderById));
orderRouter.get('/:orderId', asyncHandler(orderController.getOrder));
orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.put('/:orderId', asyncHandler(orderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));

export { orderRouter };
