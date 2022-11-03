import { model } from 'mongoose';
import { CartSchema } from '../schemas/category-schema';

const Cart = model('cart', CartSchema);

export class CartModel {
  async getCartItems(userId) {
    const filter = { userId };
    const cart = await Cart.findOne(filter);
    return cart.items;
  }

  async update(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }

  async deleteProduct(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }

  async deleteAllProducts(userId, updateInfo) {
    const filter = { userId };
    const updatedCart = await Cart.findOneAndUpdate(filter, {
      items: updateInfo,
    });
    return updatedCart;
  }
}

const cartModel = new CartModel();

export { cartModel };
