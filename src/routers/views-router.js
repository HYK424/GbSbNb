import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/order', serveStatic('order'));
viewsRouter.use('/order-lookup', serveStatic('orderLookup'));
viewsRouter.use('/order-confirm', serveStatic('order_confirm'));
viewsRouter.use('/search', serveStatic('search'));
viewsRouter.use('/notice', serveStatic('notice'));
viewsRouter.use('/mypage', serveStatic('mypage'));
viewsRouter.use('/mypage/orders', serveStatic('userOrder'));
viewsRouter.use('/mypage/info', serveStatic('mypage-info'));
viewsRouter.use('/products/:productId', serveStatic('product-detail'));
viewsRouter.use('/admin', serveStatic('adminpage'));
viewsRouter.use('/admin/add-products', serveStatic('adminPost'));
viewsRouter.use('/admin/products', serveStatic('admin'));
viewsRouter.use('/admin/products/:productId', serveStatic('adminPost'));
viewsRouter.use('/admin/users', serveStatic('adminUser'));
viewsRouter.use('/admin/orders', serveStatic('adminOrder'));
viewsRouter.use('/orderLookup', serveStatic('orderLookup'));
viewsRouter.use('/notice', serveStatic('notice'));
viewsRouter.use('/notice/:noticeId', serveStatic('noticeDetail'));
viewsRouter.use('/admin/noticeWrite', serveStatic('noticeWrite'));

viewsRouter.use('/', serveStatic(''));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };
  return express.static(resourcePath, option);
}

export { viewsRouter };
