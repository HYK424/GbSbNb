import { productService } from '../services';
import is from '@sindresorhus/is';

const ITEMS_PER_PAGE = 9;

export const productController = {
  addProduct: async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new AppError(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const productInfo = { ...req.body, ...req.file };
    const newProduct = await productService.addProduct(productInfo);
    return res.status(201).json(newProduct);
  },

  getProducts: async (req, res, next) => {
    const page = +req.query.page || 1;
    const totalPage = await productService.getTotalPage(ITEMS_PER_PAGE);
    const products = await productService.getProducts(page, ITEMS_PER_PAGE);
    return res.status(200).json({ products, totalPage });
  },

  getProudct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await productService.getProduct(productId);
    return res.status(200).json(product);
  },

  updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    const productInfo = { ...req.body, ...req.file };
    const updatedProduct = await productService.updateProduct(
      productId,
      productInfo,
    );
    return res.status(200).json(updatedProduct);
  },

  // const deleteProduct = async (req, res, next) => {
  //   const { productId } = req.params;
  //   const result = await productService.deleteProduct(productId);
  //   return res.status(200).json(result);
  // };
};
