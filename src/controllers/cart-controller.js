import { cartService } from '../services';

const addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  const updatedCartItems = await cartService.addToCart(
    userId,
    productId,
    quantity,
  );
  return res.status(200).json(updatedCartItems);
};

const deleteProduct = async (req, res, next) => {
  const { userId, productId } = req.body;
  const updatedCartItems = await cartService.updateCart(userId, productId);
  return res.status(200).json(updatedCartItems);
};

const clearCart = async (req, res, next) => {
  const { userId } = req.body;
  const updatedCartItems = await cartService.clearCart(userId);
  return res.status(200).json(updatedCartItems);
};

export { addToCart, deleteProduct, clearCart };
