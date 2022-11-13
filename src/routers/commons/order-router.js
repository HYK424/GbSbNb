import { Router } from 'express';
import { OrderController } from '../../controllers';
import { authenticator } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const orderRouter = Router();

orderRouter.get('/guest', asyncHandler(OrderController.getOrderByGuest));
orderRouter.post('/guest', asyncHandler(OrderController.createOrder));
orderRouter.put('/guest', asyncHandler(OrderController.cancelGuestOrder));

orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', asyncHandler(OrderController.getMyOrders));
orderRouter.post('/', asyncHandler(OrderController.createOrder));
orderRouter.put('/', asyncHandler(OrderController.updateOrder));
orderRouter.delete('/:orderId', asyncHandler(OrderController.deleteMyOrder));
orderRouter.put('/:orderId/status', asyncHandler(OrderController.cancelOrder));

export { orderRouter };
