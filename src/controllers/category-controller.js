import { CategoryService } from '../services';

export const categoryController = {
  createCategory: async (req, res, next) => {
    const categoryInfo = { ...req.body };
    const newCategory = await CategoryService.addCategory(categoryInfo);
    return res.status(201).json(newCategory);
  },

  getAllCategories: async (req, res, next) => {
    const categories = await CategoryService.getCategories();
    return res.status(200).json(categories);
  },

  updateCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const categoryInfo = { ...req.body };
    const updatedCategory = await CategoryService.updateCategory(
      categoryId,
      categoryInfo,
    );
    return res.status(200).json(updatedCategory);
  },

  // const deletecategory = async (req, res, next) => {
  //   const { categoryId } = req.params;
  //   const result = await CategoryService.deletecategory(categoryId);
  //   return res.status(200).json(result);
  // };
};
