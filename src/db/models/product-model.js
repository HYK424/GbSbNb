import { ObjectID } from 'bson';
import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  static async create(productInfo) {
    const newProduct = await Product.create(productInfo);
    return newProduct;
  }
  static async findAll(categoryName) {
    if (categoryName) {
      const products = await Product.find({ category: categoryName });
      return products;
    }
    const products = await Product.find({});
    return products;
  }

  static async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  static async findByKeyword(keyword) {
    const products = await Product.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    });
    return products;
  }

  static async findByPage(page, ITEMS_PER_PAGE) {
    const products = await Product.find({ view: true })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    return products;
  }

  static async findByCategory(categoryName, page, itemsPerPage) {
    const products = await Product.find({
      category: categoryName,
      view: true,
    })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    return products;
  }

  static async countAll(categoryName) {
    if (!categoryName) {
      const productCount = await Product.find({ view: true }).countDocuments();
      return productCount;
    }
    const productCount = await Product.find({
      view: true,
      category: categoryName,
    }).countDocuments();
    return productCount;
  }

  static async countOrders(productId) {
    const product = await Product.aggregate([
      {
        $match: {
          _id: new ObjectID('636762aecc4d64e36cc46f82'),
        },
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'orderItems',
          foreignField: "ObjectId('636762aecc4d64e36cc46f82')",
          as: 'orders',
        },
      },
    ]);
    console.log(product);
    return product[0].orders.length;
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

  static async softDelete(productId, updateInfo) {
    const filter = { _id: productId };
    const result = await Product.findOneAndUpdate(filter, updateInfo);
    return result;
  }

  static async delete(productId) {
    const filter = { _id: productId };
    const result = await Product.findOneAndRemove(filter);
    console.log(result);
    return result;
  }
}
