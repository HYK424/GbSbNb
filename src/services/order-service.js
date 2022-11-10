import { OrderModel } from '../db';
import { AppError, commonErrors } from '../middlewares';

class OrderService {
  static async createOrder(orderInfo) {
    const newOrder = await OrderModel.create(orderInfo);
    return newOrder;
  }

  static async getMyOrders(userId) {
    const orders = await OrderModel.findAllByUser(userId);
    return orders;
  }

  static async getOrderById(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new AppError(commonErrors.deletedData, 400, '');
    }
    return order;
  }

  static async getOrders() {
    const orders = await OrderModel.findAll();
    return orders;
  }

  static async getOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    return order;
  }

  static async updateOrder(orderId, updateInfo) {
    const order = await OrderModel.findById(orderId);
    if (order.status !== 'standby') {
      throw new AppError(
        commonErrors.businessError,
        400,
        '배송이 시작된 상품은 수정/취소할 수 없어요 :(',
      );
    }
    const result = await OrderModel.update({
      orderId,
      updateInfo,
    });
    if (!result.acknowledged) {
      throw new AppError(
        commonErrors.databaseError,
        500,
        '알 수 없는 에러가 발생했어요 :( 잠시 후 다시 시도해주세요!',
      );
    }
    return result;
  }

  static async cancelOrder(orderId, updateInfo) {
    const userId = req.currentUserId;
    const order = await OrderModel.findById(orderId);
    if (order.userId !== userId) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '해당 주문은 고객님의 주문이 아니에요 :(',
      );
    }
    if (order.status !== '상품 준비 중') {
      throw new AppError(
        commonErrors.businessError,
        400,
        '배송이 시작된 상품은 취소할 수 없어요 :(',
      );
    }
    const result = await OrderModel.update({
      orderId,
      updateInfo,
    });
    if (!result.acknowledged) {
      throw new AppError(
        commonErrors.databaseError,
        500,
        '알 수 없는 에러가 발생했어요 :( 잠시 후 다시 시도해주세요!',
      );
    }
    return result;
  }

  static async updateOrderStatus(orderIds, status) {
    const result = await OrderModel.updateStatus(orderIds, { status });
    return result;
  }

  static async deleteMyOrder(orderId) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new AppError(
        commonErrors.deletedData,
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
    if (!result.acknowledged) {
      throw new AppError(commonErrors.databaseError, 500);
    }
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
    if (!result.acknowledged) {
      throw new AppError(
        commonErrors.databaseError,
        500,
        '알 수 없는 에러가 발생했어요 :( 잠시 후 다시 시도해주세요!',
      );
    }
    return result;
  }
}

export { OrderService };
