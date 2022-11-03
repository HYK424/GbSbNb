import { productModel } from '../db';
import { categoryService } from './category-service';
import { cloudinary, productImageUpload } from '../middlewares';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    const { title, categoryId, price, description, manufacturer } = productInfo;
    const imageUrl = productInfo.path;

    const newProduct = await this.productModel.create({
      title,
      categoryId,
      price,
      description,
      imageUrl,
      manufacturer,
    });

    return newProduct;
  }

  async getProducts(page, ITEMS_PER_PAGE) {
    const products = await this.productModel.findByPage(page, ITEMS_PER_PAGE);
    return products;
  }

  async getProduct(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async getTotalPage(ITEMS_PER_PAGE) {
    const productCount = await this.productModel.countAll();
    const totalPage = Math.ceil(productCount / ITEMS_PER_PAGE);
    return totalPage;
  }

  async updateProduct(productId, productInfo) {
    let product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error(
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const { title, price, description, manufacturer } = productInfo;
    const view = productInfo.view || true;
    const categoryId = productInfo.categoryId || product.categoryId;
    if (productInfo.path) {
      cloudinary.uploader.destroy(productInfo.path);
    }
    const imageUrl = productInfo.path || product.imageUrl;

    const updatedInfo = {
      title,
      categoryId,
      price,
      description,
      imageUrl,
      view,
      manufacturer,
    };

    const updatedProduct = await this.productModel.update(
      productId,
      updatedInfo,
    );
    return updatedProduct;
  }

  // async deleteProduct(productId) {
  //   let product = await this.productModel.findById(productId);

  //   if (!product) {
  //     throw new Error(
  //       '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
  //     );
  //   }

  //   const result = await this.productModel.delete(productId);

  //   return result;
  // }
}

const productService = new ProductService(productModel);

export { productService };
