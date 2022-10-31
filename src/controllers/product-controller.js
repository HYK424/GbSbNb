import productService from '../services';

const ITEMS_PER_PAGE = 12;

const getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const productCount = await productService.getProductCount();
  const lastPage = Math.ceil(productCount / ITEMS_PER_PAGE);
  const products = productService.find(page, ITEMS_PER_PAGE);
  return res.status(200).json(products, productCount, currentPage, lastPage);
};

const addProduct = async (req, res, next) => {
  const productInfo = { ...req.body, ...req.file };
  const newProduct = await productService.addProduct(productInfo);
  return res.json(201).json(newProduct);
};

const getProudct = async (req, res, next) => {
  const { productId } = req.params;
  const product = productService.getProduct(productId);
  return res.status(200).json(product);
};

const updateProduct = async (req, res, next) => {};

const deleteProduct = async (req, res, next) => {};

export { getProducts, addProduct, getProudct, updateProduct, deleteProduct };
