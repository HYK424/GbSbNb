import { Router } from 'express';
import { authenticator } from '../../middlewares/authentication';
import { cartController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const cartRouter = Router();

cartRouter.post(
  '/',
  authenticator.isLoggedIn,
  asyncHandler(cartController.addProductToCart),
);
cartRouter.put(
  '/',
  authenticator.isLoggedIn,
  asyncHandler(cartController.deleteProduct),
);
cartRouter.delete(
  '/',
  authenticator.isLoggedIn,
  asyncHandler(cartController.clearCart),
);

export { cartRouter };
