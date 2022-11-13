import { ProductService } from '../services';
import { AppError, commonErrors } from '../middlewares';

const ITEMS_PER_PAGE = 9;

export class ProductController {
  static async createProduct(req, res, next) {
    const productInfo = { ...req.body };
    const newProduct = await ProductService.createProduct(productInfo);
    return res.status(201).json(newProduct);
  }

  static async setImageUrl(req, res, next) {
    const imageUrl = req.file.path;
    return res.status(200).json(imageUrl);
  }

  static async getProductPageInfo(page, categoryName) {
    let pageInfo;

    if (categoryName) {
      pageInfo = await ProductService.getTotalPageByCategory(
        categoryName,
        ITEMS_PER_PAGE,
      );
    } else {
      pageInfo = await ProductService.getTotalPage(ITEMS_PER_PAGE);
    }

    const { totalPage, productCount } = pageInfo;
    if (page > totalPage) {
      throw new AppError('페이지 에러', 400, '올바른 페이지를 입력하세요.');
    }

    return {
      totalPage,
      productCount,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < productCount,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
    };
  }

  static async getProducts(req, res, next) {
    const page = Math.abs(+req.query.page) || 1;
    const { q: categoryName, keyword } = req.query;
    if (keyword) {
      const products = await ProductService.getProudctsByKeyword(keyword);
      console.log(products);
      return res.status(200).json({ products, productsCount: products.length });
    }
    const pageInfo = await ProductController.getProductPageInfo(
      page,
      categoryName,
    );
    const products = await ProductService.getProducts(page, ITEMS_PER_PAGE);
    return res.status(200).json({
      products,
      ...pageInfo,
    });
  }

  static async getProductsByAdmin(req, res, next) {
    const categoryName = req.query.q;
    const products = await ProductService.getProductsByAdmin(categoryName);
    return res.status(200).json({
      products,
    });
  }

  static async getProudct(req, res, next) {
    const { productId } = req.params;
    const product = await ProductService.getProduct(productId);
    return res.status(200).json(product);
  }

  static async updateProduct(req, res, next) {
    const { productId } = req.params;
    const productInfo = { ...req.body, ...req.file };
    const updatedProduct = await ProductService.updateProduct(
      productId,
      productInfo,
    );
    return res.status(200).json(updatedProduct);
  }

  static async changeProductVisibility(req, res, next) {
    const { productId } = req.params;
    await ProductService.changeProductVisibility(productId);
    return res.sendStatus(200);
  }

  static async deleteProduct(req, res, next) {
    const { productId } = req.params;
    await ProductService.deleteProduct(productId);
    return res
      .status(200)
      .json({ message: '상품이 정상적으로 삭제되었습니다 :)' });
  }
}
