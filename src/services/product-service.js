import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    const newProduct = await this.productModel.create(productInfo);
    return newProduct;
  }

  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  async getProductsCount() {
    const productCount = await this.productModel.countAllProduct();
    return productCount;
  }

  async updateProduct(productInfoRequired, toUpdate) {
    // 객체 destructuring
    const { productId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.productModel.findById(userId);
  }

  async deleteProduct(productId) {
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error(
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    await this.productModel.delete(productId);

    return result;
  }
}

const productService = new ProductService(productModel);

export { productService };
