import { CategoryService } from '../services';

export class CategoryController {
  static async createCategory(req, res, next) {
    const categoryInfo = { ...req.body };
    const newCategory = await CategoryService.createCategory(categoryInfo);
    return res.status(201).json(newCategory);
  }

  static async getCategories(req, res, next) {
    const categories = await CategoryService.getCategories();
    return res.status(200).json(categories);
  }

  static async updateCategory(req, res, next) {
    const { categoryId } = req.params;
    const updateInfo = { ...req.body };
    const updatedCategory = await CategoryService.updateCategory(
      categoryId,
      updateInfo,
    );
    return res.status(200).json(updatedCategory);
  }

  static async deleteCategory(req, res, next) {
    const { categoryId } = req.params;
    const result = await CategoryService.deleteCategory(categoryId);
    return res
      .status(200)
      .json({ message: '카테고리가 정상적으로 삭제되었습니다 :)' });
  }
}
