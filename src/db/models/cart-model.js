import { model } from 'mongoose';
import { CartSchema } from '../schemas/cart-schema';

const Cart = model('Cart', CartSchema);

class CartModel {
  static async findByUserId(userId) {
    const filter = { userId };
    const cart = await Cart.findOne(filter);
    return cart;
  }

  static async update(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }

  static async reset(userId) {
    const filter = { userId };
    const result = await Cart.findOneAndUpdate(filter, {
      items: [],
    });
    return result;
  }
}

export { CartModel };
