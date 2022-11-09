import { OrderModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

class OrderService {
  static async createOrder(orderInfo) {
    const newOrder = await OrderModel.create(orderInfo);
    return newOrder;
  }

  static async getMyOrders(userId) {
    const orders = await OrderModel.findAllByUserId(userId);
    return orders;
  }
  static async getOrderById(orderId) {
    const order = await OrderModel.findById(orderId);
    return order;
  }

  static async getOrders() {
    const orders = await OrderModel.findAll();
    return orders;
  }

  static async getOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new Error('해당하는 주문 정보가 없습니다. 다시 확인해주세요!');
    }
    return order;
  }

  static async updateOrder(orderId, updateInfo) {
    const order = await OrderModel.findById(orderId);
    if (order.status !== '상품 준비 중') {
      throw new AppError(
        commonErrors.businessError,
        400,
        '배송이 시작된 상품은 수정/취소할 수 없어요 :(',
      );
    }
    const updatedOrder = await OrderModel.update({
      orderId,
      updateInfo,
    });
    return updatedOrder;
  }

  static async updateOrderStatus(insertData) {
    const data = await OrderModel.updateStatus(insertData);

    if (!data) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '배송 상태 변경에 실패했습니다. 동일한 상태의 주문에 대해서만 상태 변경 요청을 해주세요!',
      );
    }
    return true;
  }

  static async deleteMyOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '해당하는 주문 정보가 없습니다. 다시 확인해주세요!',
      );
    }
    if (order.deletedAt) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '이미 취소된 주문이에요! 다시 주문을 진행해 주세요.',
      );
    }
    const updateInfo = { deletedAt: Date.now() };
    const result = await OrderModel.softDelete(orderId, updateInfo);
    return result;
  }

  static async deleteOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order.deletedAt) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '회원이 삭제하지 않은 주문 내역은 삭제할 수 없습니다.',
      );
    }
    const result = await OrderModel.delete(orderId);
    return result;
  }
}

export { OrderService };
