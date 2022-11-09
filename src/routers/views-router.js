import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/search', serveStatic('search'));
viewsRouter.use('/mypage', serveStatic('mypage'));
viewsRouter.use('/mypage/info', serveStatic('mypage_info'));
viewsRouter.use('/admin', serveStatic('admin'));
viewsRouter.use('/products/:productId', serveStatic('product-detail'));
viewsRouter.use('/admin/post', serveStatic('adminPost'));
viewsRouter.use('/api/users/login', serveStatic('home'));
viewsRouter.use('/admin/products/:productId', serveStatic('adminPost'));
viewsRouter.use('/admin/allusers', serveStatic('adminUser'));
viewsRouter.use('/admin/allusers/:_id', serveStatic('adminUserGet'));
viewsRouter.use('/admin/order', serveStatic('adminOrder'));

// 존재하지 않는 페이지에 접근하는 경우 404 페이지를 렌더링
viewsRouter.use(serveStatic('404'));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
