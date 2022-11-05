import { Router } from 'express';
import { cartController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const cartRouter = Router();

cartRouter.post('/', asyncHandler(cartController.addProductToCart));
cartRouter.put('/', asyncHandler(cartController.deleteProduct));
cartRouter.delete('/', asyncHandler(cartController.clearCart));

export { cartRouter };
