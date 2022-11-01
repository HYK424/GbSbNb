import { model } from 'mongoose';
import { ProductSchema } from '../schemas/user-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  async create(productInfo) {
    const newProduct = await Product.create(productInfo);
    return newProduct;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }
  async findByCategory(category) {
    const product = await Product.find({ category });
    return product;
  }

  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async countAll() {
    const products = await Product.find({}).countDocuments();
    return products;
  }

  async update({ productId, updatedInfo }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedProduct;
  }

  async delete(productId) {
    const filter = { _id: productId };
    const result = await Product.findOneAndDelete(filter);
    return result;
  }
}

const productModel = new ProductModel();

export { productModel };
