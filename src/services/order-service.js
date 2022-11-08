import { OrderModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

class OrderService {
  async createOrder(orderInfo) {
    const newOrder = await OrderModel.create(orderInfo);
    return newOrder;
  }

  async getMyOrders(userId) {
    const orders = await OrderModel.findAllByUserId(userId);
    return orders;
  }

  async getOrders() {
    const orders = await OrderModel.findAll();
    return orders;
  }

  async getOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new Error('해당하는 주문 정보가 없습니다. 다시 확인해주세요!');
    }
    return order;
  }

  async updateOrder(orderId, updateInfo) {
    const order = await OrderModel.findById(orderId);
    if (order.status !== '배송 준비 중') {
      throw new AppError(
        commonErrors.businessError,
        400,
        '배송이 시작된 상품은 취소할 수 없어요 :(',
      );
    }
    const updatedOrder = await OrderModel.update({
      orderId,
      updateInfo,
    });
    return updatedOrder;
  }

  static async deleteMyOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      if (!order) {
        throw new Error('해당하는 주문 정보가 없습니다. 다시 확인해주세요!');
      }
    }
    const updateInfo = { deletedAt: Date.now() };
    const result = await OrderModel.softDelete(orderId, updateInfo);
    return result;
  }

  async deleteOrder(orderId) {
    const result = await OrderModel.delete(orderId);
    return result;
  }
}

export { OrderService };
