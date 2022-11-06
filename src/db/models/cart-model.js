import { model } from 'mongoose';
import { CartSchema } from '../schemas/category-schema';

const Cart = model('Cart', CartSchema);

export class CartModel {
  static async getItems(userId) {
    const filter = { userId };
    const cart = await Cart.findOne(filter);
    return cart.items;
  }

  static async update(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }

  static async deleteProduct(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }

  static async deleteAllProducts(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }
}
