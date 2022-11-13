import { ObjectID } from 'bson';
import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

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

  static async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }

  static async findByKeyword(keyword) {
    const products = await Product.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
      view: true,
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
    console.log(productCount);
    return productCount;
  }

  static async countOrders(productId) {
    const product = await Product.aggregate([
      {
        $match: {
          _id: new ObjectID(productId),
        },
      },
      {
        $set: {
          idString: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'idString',
          foreignField: 'orderItems.productId',
          as: 'orders',
        },
      },
    ]);
    return product[0].orders.length;
  }

  static async update(productId, updatedInfo) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const result = await Product.updateOne(filter, updatedInfo, option);
    return result;
  }

  static async softDelete(productId, updateInfo) {
    const filter = { _id: productId };
    const result = await Product.updateOne(filter, updateInfo);
    return result;
  }

  static async delete(productId) {
    const filter = { _id: productId };
    const result = await Product.deleteOne(filter);
    console.log(result);
    return result;
  }
}
