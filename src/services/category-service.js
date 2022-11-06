import { CategoryModel } from '../db';

class CategoryService {
  static async addCategory({ name, id }) {
    const newCategory = await CategoryModel.create({
      name,
      id,
    });
    if (!newCategory) {
      throw AppError(
        commonErrors.databaseError,
        500,
        'DB에서 알 수 없는 오류가 발생했어요 :( DB 관리자에게 문의하세요.',
      );
    }
    return newCategory;
  }

  static async getCategories() {
    const categories = await CategoryModel.findAll();
    return categories;
  }

  static async updateCategory(categoryId, updateInfo) {
    const category = await CategoryModel.findCategory(categoryId);
    if (!category) {
      throw new Error(
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const updatedCategory = await CategoryModel.update(categoryId, updateInfo);
    return updatedCategory;
  }

  // 카테고리를 삭제하면 그 안에 있는 상품은 어떻게 할 지 고민.
  static async deleteCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      throw new Error(
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const result = await CategoryModel.delete(categoryId);

    return result;
  }
}

export { CategoryService };
