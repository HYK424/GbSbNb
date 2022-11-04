import { CategoryService } from '../services';

const ITEMS_PER_PAGE = 9;

export const categoryController = {
  createCategory: async (req, res, next) => {
    const categoryInfo = { ...req.body };
    const newCategory = await CategoryService.addCategory(categoryInfo);
    return res.status(201).json(newCategory);
  },

  getAllCategories: async (req, res, next) => {
    const categories = await CategoryService.getCategories();
    return categories;
  },

  getProductsByCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const page = +req.query.page || 1;
    const totalPage = await CategoryService.getTotalPage(
      categoryId,
      ITEMS_PER_PAGE,
    );
    const products = await CategoryService.getProducts(
      categoryId,
      page,
      ITEMS_PER_PAGE,
    );
    return res.status(200).json({ products, totalPage });
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
