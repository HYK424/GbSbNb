import { CategoryModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

export class CategoryService {
  static async createCategory(categoryInfo) {
    if (await CategoryModel.findDuplicate(categoryInfo)) {
      throw new AppError(
        commonErrors.resourceDuplicationError,
        400,
        '카테고리 ID와 이름은 유일한 값입니다. 기존 카테고리 및 품목코드를 다시 한 번 확인해주세요!',
      );
    }
    const newCategory = await CategoryModel.create(categoryInfo);
    if (!newCategory) {
      throw new AppError(
        commonErrors.databaseError,
        500,
        'DB에서 알 수 없는 오류가 발생했어요. DB 관리자에게 문의하세요!',
      );
    }
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
    console.log(productCount);
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
