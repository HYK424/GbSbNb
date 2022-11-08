import { Router } from 'express';
import { authenticator } from '../../middlewares/authentication';
import { cartController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const cartRouter = Router();

cartRouter.get(
  '/',
  authenticator.isLoggedIn,
  asyncHandler(cartController.getCart),
);
cartRouter.put(
  '/',
  authenticator.isLoggedIn,
  asyncHandler(cartController.updateCart),
);
cartRouter.delete(
  '/',
  authenticator.isLoggedIn,
  asyncHandler(cartController.clearCart),
);

export { cartRouter };
