import { categoryModel } from '../db';

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

  async getProducts(page, ITEMS_PER_PAGE) {
    const products = await this.categoryModel.findByPage(page, ITEMS_PER_PAGE);
    return products;
  }

  async getTotalPage(categoryId, ITEMS_PER_PAGE) {
    const productCount = await this.categoryModel.countAll(categoryId);
    const totalPage = Math.ceil(productCount / ITEMS_PER_PAGE);
    return totalPage;
  }

  async updateCategory(categoryId, categoryInfo) {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new Error(
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const name = categoryInfo.name;
    const id = categoryInfo.id;

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

  async addToCategory(categoryName, productId) {
    const updatedCategory = await categoryModel.addProduct(
      categoryName,
      productId,
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
