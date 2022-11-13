import { Router } from 'express';
import { ProductController } from '../../controllers';
import { productImageUpload } from '../../util';

import { asyncHandler } from '../../middlewares';

const productRouter = Router();

productRouter.get('/', asyncHandler(ProductController.getProducts));
productRouter.post(
  '/upload-image',
  productImageUpload.single('image'),
  asyncHandler(ProductController.setImageUrl),
);

productRouter.get('/:productId', asyncHandler(ProductController.getProudct));

export { productRouter };
