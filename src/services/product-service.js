import { ProductModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

export class ProductService {
  static async createProduct(productInfo) {
    if (await ProductModel.findByTitle(productInfo.title)) {
      throw new AppError(
        commonErrors.resourceDuplicationError,
        400,
        '이미 존재하는 제품명이에요. 기존 제품을 수정해주세요!',
      );
    }
    const newProduct = await ProductModel.create(productInfo);
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
        '존재하지 않는 상품입니다. URL을 확인해주세요!',
      );
    }
    return product;
  }

  static async getProductsByAdmin(categoryName) {
    const products = await ProductModel.findAll(categoryName);
    return products;
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

  static async changeProductVisibility(productId) {
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
    if (!result.acknowledged) {
      throw new AppError(
        commonErrors,
        500,
        '알 수 없는 에러가 발생했어요 :( 잠시 후 다시 시도해주세요!',
      );
    }
    console.log(result);
    return result;
  }

  static async deleteProduct(productId) {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '해당 제품이 존재하지 않아요. 다시 한 번 확인해 주세요',
      );
    }
    const orderCount = await ProductModel.countOrders(productId);
    if (orderCount) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '해당 상품의 구매 내역이 존재해요. 판매를 중지하려면 비공개 처리를 해주세요 :(',
      );
    }
    const result = await ProductModel.delete(productId);
    return result;
  }
}
