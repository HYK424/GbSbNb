import { Router } from 'express';
import {
  addToCart,
  deleteProduct,
  clearCart,
} from '../controllers/cart-controller';

const cartRouter = Router();

cartRouter.post('/', addToCart);
cartRouter.put('/', deleteProduct);
cartRouter.delete('/', clearCart);

export { cartRouter };
