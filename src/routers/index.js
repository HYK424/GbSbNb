import { Router } from 'express';

// export * from './user-router';
// export * from './product-router';
// export * from './category-router';
//export * from './admin-router';

import { adminRouter } from './admins';
import { userRouter } from './users/user-router';
import { cartRouter, categoryRouter, productRouter } from './commons';

import { viewsRouter } from './views-router';

const router = Router();

router.use('/admin', adminRouter);

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/categories', categoryRouter);

export { router, viewsRouter };
