import { Router } from 'express';
import { productController } from '../controllers';
import { productImageUpload } from '../middlewares';
import { productValidator } from '../middlewares/validation';

import { loginAuthenticator } from '../../middlewares/authentication';
import { checkRole } from '../../middlewares/authorization';

const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:productId', productController.getProudct);

//productRouter.use(loginAuthenticator.isLoggedIn, checkRole);
productRouter.post(
  '/',
  productImageUpload.single('image'),
  productValidator.createProduct,
  productController.createProduct,
);
productRouter.put(
  '/:productId',
  productImageUpload.single('image'),
  productValidator.createProduct,
  productController.updateProduct,
);
// productRouter.delete('/:productId', deleteProduct);

export { productRouter };
