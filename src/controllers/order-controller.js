import { AppError, commonErrors } from '../middlewares';
import { OrderService } from '../services';

class OrderController {
  static async createOrder(req, res, next) {
    const userId = req.currentUserId;
    const { orderItems, totalPrice, address, request } = req.body;

    const newOrder = await OrderService.createOrder({
      userId,
      orderItems,
      totalPrice,
      address,
      request,
    });

    return res.status(201).json(newOrder);
  }

  static async getOrders(req, res, next) {
    const orders = await OrderService.getOrders();
    return res.status(200).json(orders);
  }

  static async getOrderById(req, res, next) {
    const { orderId } = req.body;
    const order = await OrderService.getOrderById(orderId);
    res.status(200).json(order);
  }

  static async getMyOrders(req, res, next) {
    const userId = req.currentUserId;
    const orders = await OrderService.getMyOrder(userId);
    return res.status(200).json(orders);
  }

  static async getOrder(req, res, next) {
    const { orderId } = req.params;
    const { currentUserId, currentUserRole } = req;
    const order = await OrderService.getOrder(orderId);
    if (currentUserId !== order.userId && currentUserRole === 'basic-user') {
      throw new AppError(
        commonErrors.authorizationError,
        403,
        '해당 주문은 고객님의 주문이 아니에요!',
      );
    }
    return res.status(200).json(order);
  }

  // 사용자가 수정하는 경우 수량과 주소 요청사항?
  static async updateOrder(req, res, next) {
    const { orderId } = req.params;
    const { orderItems, totalPrice, address, request } = req.body;
    const updateInfo = {
      ...(orderItems && { orderItems }),
      ...(address && { address }),
      ...(totalPrice && { totalPrice }),
      ...(request && { request }),
    };
    const updatedOrder = await OrderService.updateOrder(orderId, updateInfo);

    res.status(200).json(updatedOrder);
  }

  static async updateOrderStatus(req, res, next) {
    const orderId = 
  }

  // 이건 소프트 딜리트임
  static async deleteMyOrder(req, res, next) {
    const { orderId } = req.params;
    const result = await OrderService.deleteMyOrder(orderId);

    res.status(200).json(result);
  }
  // 이건 진짜 딜리트임
  static async deleteOrder(req, res, next) {
    const { orderId } = req.params;
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  }
}

export { OrderController };
