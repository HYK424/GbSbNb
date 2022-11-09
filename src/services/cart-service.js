import { CartModel } from '../db';

class CartService {
  static async getCartItems(userId) {
    const items = await CartModel.findByUserId(userId);
    return items;
  }
  static async updateCart(userId, updateInfo) {
    const updatedCart = await CartModel.update(userId, updateInfo);
    return updatedCart.items;
  }

  static async clearCart(userId) {
    const updatedCart = await CartModel.reset(userId);
    return updatedCart.items;
  }
}

export { CartService };
