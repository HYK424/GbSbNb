import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async create(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

<<<<<<< HEAD
  async findByCategory(categoryId) {
    const products = await Category.find({ code: categoryId });
=======
  async findByPage(categoryId) {
    const products = await Category.findOne({ id: categoryId }).populate(
      'products',
    );
>>>>>>> parent of 3b43bd5... feat:finish category api
    return products;
  }

  async countAll(categoryId) {
    const category = await Category.findOne({
      _id: categoryId,
    });
    const productCount = category.products.length;
    return productCount;
  }

  async update(categoryId, updatedInfo) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      updatedInfo,
      option,
    );
    return updatedCategory;
  }

  async addProduct(categoryName, productId) {
    const result = await Category.findOneAndUpdate(categoryName, {
      $push: { products: productId },
    });
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
