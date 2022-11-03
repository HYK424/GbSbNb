import { cartService } from '../services';

const addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  const updatedCart = await cartService.addToCart(userId, productId, quantity);
  return res.status(200).json(updatedCart);
};

const deleteProduct = async (req, res, next) => {
  const { userId, productId } = req.body;
  const updatedCart = await cartService.updateCart(userId, productId);
  return res.status(200).json(updatedCart);
};

const clearCart = async (req, res, next) => {
  const { userId } = req.body;
  await cartService.clearCart(userId);

  return res.sendStatus(200);
};

export { addToCart, deleteProduct, clearCart };
