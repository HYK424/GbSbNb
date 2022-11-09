import { CartService } from '../services';

export const cartController = {
  getCartItems: async (req, res, next) => {
    const userId = req.currentUserId;
    const cartItems = await CartService.getCartItems(userId);
    return res.status(200).json(cartItems);
  },
  updateCart: async (req, res, next) => {
    const updateInfo = req.body.cartItems;
    const updatedCartItems = await CartService.updateCart(userId, updateInfo);
    return res.status(200).json(updatedCartItems);
  },

  clearCart: async (req, res, next) => {
    const { userId } = req.body;
    const updatedCartItems = await CartService.clearCart(userId);
    return res.status(200).json(updatedCartItems);
  },
};
