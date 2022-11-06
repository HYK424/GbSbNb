import { CartService } from '../services';

export const cartController = {
  addProductToCart: async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    const updatedCartItems = await CartService.addToCart(
      userId,
      productId,
      quantity,
    );
    return res.status(200).json(updatedCartItems);
  },

  deleteProduct: async (req, res, next) => {
    const { userId, productId } = req.body;
    const updatedCartItems = await CartService.updateCart(userId, productId);
    return res.status(200).json(updatedCartItems);
  },

  clearCart: async (req, res, next) => {
    const { userId } = req.body;
    const updatedCartItems = await CartService.clearCart(userId);
    return res.status(200).json(updatedCartItems);
  },
};
