import { Router } from 'express';
import { OrderController } from '../../controllers';
import { authenticator } from '../../middlewares';

const orderRouter = Router();

orderRouter.post('/', OrderController.createOrder);
orderRouter.post('/', OrderController.getOrderById);
orderRouter.use(authenticator.isLoggedIn);
orderRouter.get('/', OrderController.getMyOrders);
orderRouter.get('/:orderId', OrderController.getOrder);
orderRouter.put('/:orderId', OrderController.updateOrder);
orderRouter.delete('/:orederId', OrderController.deleteMyOrder);

export { orderRouter };
