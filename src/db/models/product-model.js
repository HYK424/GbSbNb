import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  static async create(productInfo) {
    const newProduct = await Product.create(productInfo);
    return newProduct;
  }
  // Admin 페이지용
  static async findAll() {
    const products = await Product.find({});
    return products;
  }

  static async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  static async findByPage(page, ITEMS_PER_PAGE) {
    const products = await Product.find({ view: true })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    return products;
  }

  static async findByCategory(categoryId, page, ITEMS_PER_PAGE) {
    const products = await Product.find({ categoryId: categoryId, view: true })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    return products;
  }

  static async countAll(categoryId) {
    if (!categoryId) {
      const productCount = await Product.find({ view: 1 }).countDocuments();
      return productCount;
    }
    const productCount = await Product.find({
      view: true,
      categoryId,
    }).countDocuments();
    return productCount;
  }

  static async update(productId, updatedInfo) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      updatedInfo,
      option,
    );
    return updatedProduct;
  }

  // static delete: async (productId) {
  //   const filter = { _id: productId };
  //   const result = await Product.findOneAndDelete(filter);
  //   return result;
  // }
}
