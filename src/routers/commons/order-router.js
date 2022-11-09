import { Router } from 'express';
import { OrderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const orderRouter = Router();

orderRouter.post('/', asyncHandler(OrderController.createOrder));
// orderRouter.get('/orderId', asyncHandler(OrderController.getOrderById));
orderRouter.get('/:orderId', asyncHandler(OrderController.getOrder));
orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(OrderController.getMyOrders));
orderRouter.put('/:orderId', asyncHandler(OrderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(OrderController.deleteMyOrder));

export { orderRouter };
