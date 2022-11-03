import { categoryModel } from '../db';
import { productModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async addCategory({ name, id }) {
    const newCategory = await this.categoryModel.create({
      name,
      id,
    });
    return newCategory;
  }

  async getCategories() {
    const categories = await this.categoryModel.findAll({});
    return categories;
  }

  async getProducts(categoryId, page, ITEMS_PER_PAGE) {
    const products = await productModel.findByCategory(
      categoryId,
      page,
      ITEMS_PER_PAGE,
    );
    return products;
  }

  async getTotalPage(categoryId, ITEMS_PER_PAGE) {
    const productCount = await productModel.countAll(categoryId);
    const totalPage = Math.ceil(productCount / ITEMS_PER_PAGE);
    return totalPage;
  }

  async updateCategory(categoryId, categoryInfo) {
    const category = await this.categoryModel.findCategory(categoryId);
    if (!category) {
      throw new Error(
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const { name, id } = categoryInfo;

    const updatedInfo = {
      name,
      id,
    };

    const updatedCategory = await this.categoryModel.update(
      categoryId,
      updatedInfo,
    );
    return updatedCategory;
  }

  // async deleteProduct(productId) {
  //   let product = await this.categoryModel.findById(productId);

  //   if (!product) {
  //     throw new Error(
  //       '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.',
  //     );
  //   }

  //   const result = await this.categoryModel.delete(productId);

  //   return result;
  // }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
