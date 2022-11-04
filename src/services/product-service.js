import { ProductModel } from '../db';
import { cloudinary } from '../middlewares';

class ProductService {
  static async addProduct(productInfo) {
    const { title, categoryId, price, description, manufacturer } = productInfo;
    const imageUrl = productInfo.path;

    const newProduct = await ProductModel.create({
      title,
      categoryId,
      price,
      description,
      imageUrl,
      manufacturer,
    });

    return newProduct;
  }

  static async getProducts(page, ITEMS_PER_PAGE) {
    const products = await ProductModel.findByPage(page, ITEMS_PER_PAGE);
    return products;
  }

  static async getProduct(productId) {
    const product = await ProductModel.findById(productId);
    return product;
  }

  static async getTotalPage(ITEMS_PER_PAGE) {
    const productCount = await ProductModel.countAll();
    const totalPage = Math.ceil(productCount / ITEMS_PER_PAGE);
    return totalPage;
  }

  static async updateProduct(productId, productInfo) {
    let product = await ProductModel.findById(productId);
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

    const updatedProduct = await ProductModel.update(productId, updatedInfo);
    return updatedProduct;
  }

  // static async deleteProduct(productId) {
  //   let product = await ProductModel.findById(productId);

  //   if (!product) {
  //     throw new Error(
  //       '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
  //     );
  //   }

  //   const result = await ProductModel.delete(productId);

  //   return result;
  // }
}

export { ProductService };
