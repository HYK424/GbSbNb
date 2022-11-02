import { Router } from 'express';
import {} from '../controllers/product-controller';

const cartRouter = Router();

cartRouter.post('/', updateCart);
cartRouter.delete('/', clearCart);

export { cartRouter };
