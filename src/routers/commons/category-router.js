import { Router } from 'express';
import { CategoryController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const categoryRouter = Router();

categoryRouter.get('/', asyncHandler(CategoryController.getCategories));

export { categoryRouter };
