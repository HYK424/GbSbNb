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

  static async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  static async update(categoryId, updateInfo) {
    const filter = { id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      updateInfo,
      option,
    );
    return updatedCategory;
  }

  static async delete(categoryId) {
    const filter = { _id: categoryId };
    const result = await Category.findOneAndDelete(filter);
    return result;
  }
}
