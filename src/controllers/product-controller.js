import { productService } from '../services';

const ITEMS_PER_PAGE = 9;

const addProduct = async (req, res, next) => {
  const productInfo = { ...req.body, ...req.file };
  console.log(productInfo);
  const newProduct = await productService.addProduct(productInfo);
  return res.status(201).json(newProduct);
};

const getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const totalPage = await productService.getTotalPage(ITEMS_PER_PAGE);
  const products = await productService.getProducts(page, ITEMS_PER_PAGE);
  return res.status(200).json({ products, totalPage });
};

const getProudct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await productService.getProduct(productId);
  return res.status(200).json(product);
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const productInfo = { ...req.body, ...req.file };
  const updatedProduct = await productService.updateProduct(
    productId,
    productInfo,
  );
  return res.status(200).json(updatedProduct);
};

// const deleteProduct = async (req, res, next) => {
//   const { productId } = req.params;
//   const result = await productService.deleteProduct(productId);
//   return res.status(200).json(result);
// };

export { getProducts, addProduct, getProudct, updateProduct };
