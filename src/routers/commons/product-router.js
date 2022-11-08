import { Router } from 'express';
import { productController } from '../../controllers';
import { productImageUpload } from '../../util';
import { productValidator } from '../../middlewares/validation';
import { asyncHandler } from '../../middlewares';

const productRouter = Router();

productRouter.get('/', asyncHandler(productController.getProducts));
productRouter.get('/admin', asyncHandler(productController.getProductsByAdmin));
productRouter.get(
  '/search',
  asyncHandler(productController.getProudctsByKeyword),
);
productRouter.get('/:productId', asyncHandler(productController.getProudct));

// productRouter.use(loginAuthenticator.isLoggedIn, checkRole);
productRouter.post(
  '/',
  productImageUpload.single('image'),
  productValidator.createProduct,
  asyncHandler(productController.createProduct),
);
productRouter.put(
  '/:productId',
  productImageUpload.single('image'),
  productValidator.createProduct,
  asyncHandler(productController.updateProduct),
);
productRouter.delete(
  '/:productId',
  asyncHandler(productController.deleteProduct),
);

// productRouter.put('/:productId/view -> 쿼리문', productController.changeView);

export { productRouter };
