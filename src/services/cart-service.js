import { cartModel } from '../db';

class CartService {
  constructor(cartModel) {
    this.cartModel = cartModel;
  }

  // async addToCart(userId, productId, quantity) {
  //   const cartItems = this.cartModel.getCartItems(userId);

  //   .findIndex((cp) => {
  //     return cp.productId.toString() === product._id.toString();
  //   });
  //   let newQuantity = 1;
  //   const updatedCartItems = [...this.cart.items];

  //   if (cartProductIndex >= 0) {
  //     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
  //     updatedCartItems[cartProductIndex].quantity = newQuantity;
  //   } else {
  //     updatedCartItems.push({
  //       productId: product._id,
  //       quantity: newQuantity,
  //     });
  //   }
  //   const updatedCart = {
  //   };
  //   this.cart = updatedCart;
  //   return this.save();
  // }

  async updateCart(userId, productId) {
    const updatedCart = await cartModel.this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCart;
    return this.save();
  }

  async clearCart(userId) {
    const updateInfo = [];
    await cartModel.clearCart(userId, updateInfo);
    return;
  }
}

const cartService = new CartService(cartModel);

export { cartService };
