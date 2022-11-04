import { Router } from 'express';
import { cartController } from '../controllers';

const cartRouter = Router();

cartRouter.post('/', cartController.addToCart);
cartRouter.put('/', cartController.deleteProduct);
cartRouter.delete('/', cartController.clearCart);

export { cartRouter };
