import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  async create(productInfo) {
    const newProduct = await Product.create(productInfo);
    return newProduct;
  }
  // Admin 페이지용
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async findByPage(page, ITEMS_PER_PAGE) {
    const products = await Product.find({ view: true })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    return products;
  }

  async findByCategory(categoryId, page, ITEMS_PER_PAGE) {
    const products = await Product.find({ categoryId: categoryId, view: true })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    return products;
  }

  async countAll() {
    const productCount = await Product.find({ view: 1 }).countDocuments();
    return productCount;
  }

  async update(productId, updatedInfo) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      updatedInfo,
      option,
    );
    return updatedProduct;
  }

  // async delete(productId) {
  //   const filter = { _id: productId };
  //   const result = await Product.findOneAndDelete(filter);
  //   return result;
  // }
}

const productModel = new ProductModel();

export { productModel };
