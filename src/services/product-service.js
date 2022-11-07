import { ProductModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

class ProductService {
  static async createProduct(productInfo) {
    const {
      title,
      category,
      price,
      description,
      manufacturer,
      path: imageUrl,
    } = productInfo;

    const newProduct = await ProductModel.create({
      title,
      category,
      price,
      description,
      imageUrl,
      manufacturer,
    });

    return newProduct;
  }

  static async getTotalPage(itemsPerPage) {
    const productCount = await ProductModel.countAll();
    if (!productCount) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 조건을 만족하는 상품이 없습니다 :(',
      );
    }
    const totalPage = Math.ceil(productCount / itemsPerPage);
    return { totalPage, productCount };
  }

  static async getProducts(page, itemsPerPage) {
    const products = await ProductModel.findByPage(page, itemsPerPage);
    if (!products) {
      throw new AppError(
        commonErrors.databaseError,
        500,
        'DB에서 알 수 없는 오류가 발생했어요 :( DB 관리자에게 문의하세요.',
      );
    }
    return products;
  }

  static async getProudctsByKeyword(keyword) {
    const products = await ProductModel.findByKeyword(keyword);
    return products;
  }

  static async getTotalPageByCategory(categoryName, itemsPerPage) {
    const productCount = await ProductModel.countAll(categoryName);
    if (!productCount) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 조건을 만족하는 상품이 없습니다 :(',
      );
    }
    const totalPage = Math.ceil(productCount / itemsPerPage);
    return { totalPage, productCount };
  }

  static async getProductsByCategory(categoryName, page, itemsPerPage) {
    const products = await ProductModel.findByCategory(
      categoryName,
      page,
      itemsPerPage,
    );
    if (!products) {
      throw new AppError(
        commonErrors.databaseError,
        500,
        'DB에서 알 수 없는 오류가 발생했어요 :( DB 관리자에게 문의하세요.',
      );
    }
    return products;
  }

  static async getProduct(productId) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '존재하지 않는 상품입니다. URL을 확인해주세요.',
      );
    }
    return product;
  }

  static async updateProduct(productId, productInfo) {
    let product = await ProductModel.findById(productId);
    if (!product) {
      throw new AppError(
        '해당 상품 없음',
        400,
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const { title, price, description, manufacturer } = productInfo;
    const category = productInfo.category || product.category;
    const imageUrl = productInfo.path || product.imageUrl;

    const updatedInfo = {
      title,
      category,
      price,
      description,
      imageUrl,
      manufacturer,
    };

    const updatedProduct = await ProductModel.update(productId, updatedInfo);
    return updatedProduct;
  }

  static async softDeleteProduct(productId) {
    let product = await ProductModel.findById(productId);

    if (!product) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }
    const updateInfo = product.view ? { view: false } : { view: true };
    const result = await ProductModel.softDelete(productId, updateInfo);

    return result;
  }
}

export { ProductService };
