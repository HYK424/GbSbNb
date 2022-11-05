import { CategoryModel } from '../db';

class CategoryService {
  static async addCategory({ name, id }) {
    const newCategory = await CategoryModel.create({
      name,
      id,
    });
    return newCategory;
  }

  static async getCategories() {
    const categories = await CategoryModel.findAll();
    return categories;
  }

  static async updateCategory(categoryId, categoryInfo) {
    const category = await CategoryModel.findCategory(categoryId);
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

    const updatedCategory = await CategoryModel.update(categoryId, updatedInfo);
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
