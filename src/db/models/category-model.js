import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('Category', CategorySchema);

export class CategoryModel {
  static async create(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  }

  static async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  static async findCategory(categoryId) {
    const category = await Category.findOne({ id: categoryId });
    return category;
  }

  static async findByPage(categoryId) {
    const products = await Category.findOne({ id: categoryId }).populate(
      'products',
    );
    return products;
  }

  static async countAll(categoryId) {
    const category = await Category.findOne({
      id: categoryId,
    });
    const productCount = category.products.length;
    return productCount;
  }

  static async update(categoryId, updateInfo) {
    const filter = { id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      { id, name },
      option,
    );
    return updatedCategory;
  }
}
