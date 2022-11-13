import { Router } from 'express';
import { ProductController } from '../../controllers';
import {
  asyncHandler,
  authenticator,
  checkRole,
  productValidator,
} from '../../middlewares';

const adminProductRouter = Router();

adminProductRouter.use(authenticator.isLoggedIn, checkRole);
adminProductRouter.get('/', asyncHandler(ProductController.getProductsByAdmin));
adminProductRouter.post(
  '/',

  productValidator.createProduct,
  asyncHandler(ProductController.createProduct),
);
adminProductRouter.put(
  '/:productId',
  asyncHandler(ProductController.updateProduct),
);
adminProductRouter.delete(
  '/:productId',
  asyncHandler(ProductController.deleteProduct),
);
adminProductRouter.put(
  '/:productId/visibility',
  asyncHandler(ProductController.changeProductVisibility),
);

export { adminProductRouter };
