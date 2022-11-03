import { cartModel } from '../db';

class CartService {
  constructor(cartModel) {
    this.cartModel = cartModel;
  }

  async addToCart(userId, productId, quantity) {
    const cartItems = this.cartModel.getCartItems(userId);
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

  async updateCart(userId, productId) {
    const cartItems = this.cartModel.getCartItems(userId);
    const itemIndex = cartItems.find((item) => item.productId === productId);
    if (itemIndex === -1) {
      throw new Error('장바구니에 해당 상품이 존재하지 않습니다.');
    }
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== itemIndex,
    );
    const updatedCart = await cartModel.deleteProduct(userId, updatedCartItems);
    return updatedCart.items;
  }

  async clearCart(userId) {
    const updateInfo = [];
    const updatedCart = await cartModel.deleteAllProducts(userId, updateInfo);
    return updatedCart.items;
  }
}

const cartService = new CartService(cartModel);

export { cartService };
