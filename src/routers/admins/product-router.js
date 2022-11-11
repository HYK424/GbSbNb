import { Router } from 'express';
import { productController } from '../../controllers';
import {
  asyncHandler,
  authenticator,
  checkRole,
  productValidator,
} from '../../middlewares';

const adminProductRouter = Router();

adminProductRouter.use(authenticator.isLoggedIn, checkRole);
adminProductRouter.get('/', asyncHandler(productController.getProductsByAdmin));
adminProductRouter.post(
  '/',

  productValidator.createProduct,
  asyncHandler(productController.createProduct),
);
adminProductRouter.put(
  '/:productId',
  asyncHandler(productController.updateProduct),
);
adminProductRouter.delete(
  '/:productId',
  asyncHandler(productController.deleteProduct),
);
adminProductRouter.get(
  '/:productId/private',
  asyncHandler(productController.softDeleteProduct),
);

export { adminProductRouter };
