import { Router } from 'express';
import { categoryController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const categoryRouter = Router();

categoryRouter.get('/', asyncHandler(categoryController.getAllCategories));
categoryRouter.post('/', asyncHandler(categoryController.createCategory));

categoryRouter.put(
  '/:categoryId',
  asyncHandler(categoryController.updateCategory),
);

categoryRouter.delete(
  '/:categoryId',
  asyncHandler(categoryController.deleteCategory),
);

export { categoryRouter };
