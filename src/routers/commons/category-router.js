import { Router } from 'express';
import { categoryController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const categoryRouter = Router();

categoryRouter.get('/', asyncHandler(categoryController.getCategories));

export { categoryRouter };
