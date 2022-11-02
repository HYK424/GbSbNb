import { productModel } from '../db';
import { categoryService } from './category-service';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    const { title, category, price, description, manufacturer } = productInfo;
    const thumbnail = productInfo.path;

    const newProduct = await this.productModel.create({
      title,
      category,
      price,
      description,
      thumbnail,
      manufacturer,
    });

    await categoryService.addToCategory(category, newProduct._id);
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

    const title = productInfo.title;
    const category = productInfo.category || product.category;
    const price = productInfo.price;
    const description = productInfo.description;
    const imageUrl = productInfo.path || product.imageUrl;
    const view = productInfo.view || true;
    const manufacturer = productInfo.manufacturer;

    const updatedInfo = {
      title,
      category,
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

  async deleteProduct(productId) {
    let product = await this.productModel.findById(productId);

    if (!product) {
      throw new Error(
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const result = await this.productModel.delete(productId);

    return result;
  }
}

const productService = new ProductService(productModel);

export { productService };
