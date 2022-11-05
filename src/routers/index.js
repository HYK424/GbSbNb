import { Router } from 'express';

// export * from './user-router';
// export * from './product-router';
// export * from './category-router';
//export * from './admin-router';

import { admin_userRouter } from './admins';
import { userRouter } from './users/user-router';
import { cartRouter, categoryRouter, productRouter } from './commons';

import { viewsRouter } from './views-router';

const router = Router();

router.use('/admin', admin_userRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/categories', categoryRouter);

export { router, viewsRouter };
