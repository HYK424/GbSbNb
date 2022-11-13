import { AppError, commonErrors } from '../middlewares';
import { OrderService } from '../services';

export class OrderController {
  static async createOrder(req, res, next) {
    const userId = req.userId || '비회원';
    const orderInfo = { userId, ...req.body };
    const newOrder = await OrderService.createOrder(orderInfo);

    return res.status(201).json(newOrder);
  }

  static async getOrders(req, res, next) {
    const orders = await OrderService.getOrders();
    return res.status(200).json(orders);
  }

  static async getOrdersByUserId(req, res, next) {
    const { userId } = req;
    const orders = await OrderService.getOrdersByUserId(userId);
    return res.status(200).json(orders);
  }

  static async cancelOrder(req, res, next) {
    const { orderId, updateInfo } = req.params;
    const { userId } = req;
    await OrderService.cancelOrder(orderId, updateInfo, userId);

    return res.status(200).json('주문이 정상적으로 취소되었습니다 :)');
  }

  static async updateOrder(req, res, next) {
    const { orderId, updateInfo } = req.body;
    const updatedOrder = await OrderService.updateOrder(orderId, updateInfo);
    return res.status(200).json(updatedOrder);
  }

  static async updateOrderStatus(req, res, next) {
    const { orderIds, status } = req.body;
    if (['배송 중', '배송 완료'].indexOf(status) === -1) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '올바른 배송 상태를 지정하여 다시 요청해주세요 :(',
      );
    }
    await OrderService.updateOrderStatus(orderIds, status);
    res.status(200).json('배송 상태가 정상적으로 수정되었습니다 😊');
  }

  static async deleteOrderByUser(req, res, next) {
    const { params: orderId, userId } = req;

    await OrderService.deleteOrderByUser(orderId, userId);
    res.status(200).json({ message: '주문이 정상적으로 삭제되었습니다 😊' });
  }

  static async deleteOrder(req, res, next) {
    const { orderId } = req.params;
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  }

  static async getOrderByGuest(req, res) {
    const { orderId, phoneNumber } = req.body;
    const order = await OrderService.getOrderByGuest(orderId, phoneNumber);
    if (!order) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '해당 정보에 해당하는 주문을 찾을 수 없어요 :(',
      );
    }
    return res.status(200).json(order);
  }

  static async cancelGuestOrder(req, res, next) {
    const { orderCode, phoneNumber } = req.body;
    const updateInfo = { status: '주문 취소' };
    await OrderService.cancelGuestOrder(orderCode, phoneNumber, updateInfo);
    res
      .status(200)
      .json({ message: '비회원 주문 취소가 정상적으로 완료되었습니다 😊' });
  }
}
