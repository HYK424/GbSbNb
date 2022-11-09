import { CategoryService } from '../services';

export const categoryController = {
  createCategory: async (req, res, next) => {
    const categoryInfo = { ...req.body };
    const newCategory = await CategoryService.createCategory(categoryInfo);
    return res.status(201).json(newCategory);
  },

  getAllCategories: async (req, res, next) => {
    const categories = await CategoryService.getCategories();
    return res.status(200).json(categories);
  },

  updateCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const updateInfo = { ...req.body };
    const updatedCategory = await CategoryService.updateCategory(
      categoryId,
      updateInfo,
    );
    return res.status(200).json(updatedCategory);
  },

  deleteCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const result = await CategoryService.deleteCategory(categoryId);
    return res.status(200).json(result);
  },
};
