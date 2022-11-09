import { CategoryModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

class CategoryService {
  static async addCategory({ name, id }) {
    if (await CategoryModel.findByName(name)) {
      throw new AppError(
        commonErrors.resourceDuplicationError,
        400,
        '이미 존재하는 카테고리입니다.',
      );
    }
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

  static async updateCategory(categoryId, updateInfo) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const updatedCategory = await CategoryModel.update(categoryId, updateInfo);
    return updatedCategory;
  }

  static async deleteCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }
    const productCount = await CategoryModel.countProducts(categoryId);
    if (productCount) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '카테고리에 속한 상품이 있어서 삭제할 수 없어요 :(',
      );
    }

    const result = await CategoryModel.delete(categoryId);

    return result;
  }
}

export { CategoryService };
