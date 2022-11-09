import { Router } from 'express';
import { orderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const orderRouter = Router();

orderRouter.post('/', asyncHandler(orderController.createOrder));
orderRouter.get('/', orderController.getOrders);
orderRouter.get('/:orderId', asyncHandler(orderController.getOrderById));
orderRouter.delete('/:orderId', orderController.deleteOrder);

orderRouter.get('/:orderId', asyncHandler(orderController.getOrder));
orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(orderController.getMyOrders));
orderRouter.put('/', asyncHandler(orderController.updateOrderStatus));
orderRouter.put('/:orderId', asyncHandler(orderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(orderController.deleteMyOrder));

export { orderRouter };
