import { ProductService } from '../services';
import { AppError, commonErrors } from '../middlewares';

const ITEMS_PER_PAGE = 9;

export const productController = {
  createProduct: async (req, res, next) => {
    const productInfo = { ...req.body, ...req.file };
    const newProduct = await ProductService.addProduct(productInfo);
    return res.status(201).json(newProduct);
  },

  getProducts: async (req, res, next) => {
    const page = +req.query.page || 1;
    const categoryName = req.query.q;
    if (categoryName) {
      const totalPage = await ProductService.getTotalPageByCategory(
        ITEMS_PER_PAGE,
      );
      if (page > totalPage) {
        throw new AppError('페이지 에러', 400, '올바른 페이지를 입력하세요.');
      }
      const products = await ProductService.getProductsByCategory(
        categoryName,
        page,
        ITEMS_PER_PAGE,
      );
      return res.status(200).json({ products, totalPage });
    } else {
      const totalPage = await ProductService.getTotalPage(ITEMS_PER_PAGE);
      if (page > totalPage) {
        throw new AppError('페이지 에러', 400, '올바른 페이지를 입력하세요.');
      }
      const products = await ProductService.getProducts(page, ITEMS_PER_PAGE);
      return res.status(200).json({ products, totalPage });
    }
  },

  getProudct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await ProductService.getProduct(productId);
    return res.status(200).json(product);
  },

  updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    const productInfo = { ...req.body, ...req.file };
    const updatedProduct = await ProductService.updateProduct(
      productId,
      productInfo,
    );
    return res.status(200).json(updatedProduct);
  },

  // deleteProduct: async (req, res, next) => {
  //   const { productId } = req.params;
  //   const result = await ProductService.deleteProduct(productId);
  //   return res.status(200).json(result);
  // };
};
