import { model } from 'mongoose';
import { CartSchema } from '../schemas/category-schema';

const Cart = model('cart', CartSchema);

export class CartModel {
  async getCartItems(userId) {
    const cart = await Cart.findOne({ userId });
    return cart.items;
  }
  async addProduct(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  }

  async deleteProduct() {
    const categories = await Category.find({});
    return categories;
  }

  async deleteAllProducts(userId, updateInfo) {
    const filter = { userId };
    await Cart.findOneAndUpdate(filter, updateInfo);
    return;
  }
}

const cartModel = new CartModel();

export { cartModel };
