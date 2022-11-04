import { ProductService } from '../db';
import { CartModel } from '../db';

class CategoryService {
  static async addCategory({ name, id }) {
    const newCategory = await CartModel.create({
      name,
      id,
    });
    return newCategory;
  }

  static async getCategories() {
    const categories = await CartModel.findAll({});
    return categories;
  }

  static async getProducts(categoryId, page, ITEMS_PER_PAGE) {
    const products = await ProductService.findByCategory(
      categoryId,
      page,
      ITEMS_PER_PAGE,
    );
    return products;
  }

  static async getTotalPage(categoryId, ITEMS_PER_PAGE) {
    const productCount = await ProductService.countAll(categoryId);
    const totalPage = Math.ceil(productCount / ITEMS_PER_PAGE);
    return totalPage;
  }

  static async updateCategory(categoryId, categoryInfo) {
    const category = await CartModel.findCategory(categoryId);
    if (!category) {
      throw new Error(
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const { name, id } = categoryInfo;

    const updatedInfo = {
      name,
      id,
    };

    const updatedCategory = await CartModel.update(categoryId, updatedInfo);
    return updatedCategory;
  }

  // static async deleteProduct(productId) {
  //   let product = await CartModel.findById(productId);

  //   if (!product) {
  //     throw new Error(
  //       '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
  //     );
  //   }

  //   const result = await CartModel.delete(productId);

  //   return result;
  // }
}

export { CategoryService };
