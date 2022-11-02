import multer from 'multer';

const productImageUpload = multer({
  dest: 'images/product',
});

export { productImageUpload };
