import { CartModel } from '../db';

class CartService {
  static async addToCart(userId, productId, quantity) {
    const cartItems = CartModel.getCartItems(userId);
    const updatedCartItems = [...cart.items];
    const itemIndex = cartItems.find((item) => item.productId === productId);

    if (itemIndex >= 0) {
      updatedCartItems[itemIndex].quantity += quantity;
    } else {
      updatedCartItems.push({
        productId: productId,
        quantity: quantity,
      });
    }
    const updatedCart = await cartModel.update(userId, updatedCartItems);
    return updatedCart.items;
  }

  static async updateCart(userId, productId) {
    const cartItems = CartModel.getCartItems(userId);
    const itemIndex = cartItems.find((item) => item.productId === productId);
    if (itemIndex === -1) {
      throw new Error('장바구니에 해당 상품이 존재하지 않습니다.');
    }
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== itemIndex,
    );
    const updatedCart = await CartModel.deleteProduct(userId, updatedCartItems);
    return updatedCart.items;
  }

  static async clearCart(userId) {
    const updateInfo = [];
    const updatedCart = await CartModel.deleteAllProducts(userId, updateInfo);
    return updatedCart.items;
  }
}

export { CartService };
