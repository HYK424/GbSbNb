import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const orderRouter = Router();

orderRouter.post('/', asyncHandler(orderController.createOrder));
orderRouter.get('/:orderId', asyncHandler(orderController.getOrderById));

orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/:orderId', asyncHandler(orderController.getOrder));
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.put('/:orderId', asyncHandler(orderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));

export { orderRouter };
