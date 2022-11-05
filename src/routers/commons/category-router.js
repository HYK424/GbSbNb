import { Router } from 'express';
import { categoryController } from '../../controllers';

const categoryRouter = Router();

categoryRouter.post('/', categoryController.createCategory);

categoryRouter.get('/:categoryId', categoryController.getProductsByCategory);
categoryRouter.put('/:categoryId', categoryController.updateCategory);

export { categoryRouter };
