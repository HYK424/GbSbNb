import { Router } from 'express';
import { loginAuthenticator } from '../../middlewares/authentication';
import { cartController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const cartRouter = Router();

cartRouter.post(
  '/',
  loginAuthenticator.isLoggedIn,
  asyncHandler(cartController.addProductToCart),
);
cartRouter.put(
  '/',
  loginAuthenticator.isLoggedIn,
  asyncHandler(cartController.deleteProduct),
);
cartRouter.delete(
  '/',
  loginAuthenticator.isLoggedIn,
  asyncHandler(cartController.clearCart),
);

export { cartRouter };
