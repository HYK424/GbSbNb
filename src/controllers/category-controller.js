import { categoryService } from '../services';

const ITEMS_PER_PAGE = 9;

const addCategory = async (req, res, next) => {
  const categoryInfo = { ...req.body };
  const newCategory = await categoryService.addCategory(categoryInfo);
  return res.status(201).json(newCategory);
};

const getAllCategories = async (req, res, next) => {
  const categories = await categoryService.getCategories();
  return categories;
};

const getProductsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const page = +req.query.page || 1;
  const totalPage = await categoryService.getTotalPage(
    categoryId,
    ITEMS_PER_PAGE,
  );
  const products = await categoryService.getProducts(
    categoryId,
    page,
    ITEMS_PER_PAGE,
  );
  return res.status(200).json({ products, totalPage });
};

const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const categoryInfo = { ...req.body };
  const updatedCategory = await categoryService.updateCategory(
    categoryId,
    categoryInfo,
  );
  return res.status(200).json(updatedCategory);
};

// const deletecategory = async (req, res, next) => {
//   const { categoryId } = req.params;
//   const result = await categoryService.deletecategory(categoryId);
//   return res.status(200).json(result);
// };

export { addCategory, getProductsByCategory, updateCategory };
