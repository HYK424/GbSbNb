import { checkRole, loginRequired } from '../middlewares';
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

  static async getOrders() {
    const orders = await OrderService.getOrders();
    return res.status(200).json(orders);
  }

  static async getMyOrders(req, res, next) {
    const userId = req.currentUserId;
    const orders = await OrderService.getMyOrder(userId);
    return res.status(200).json(orders);
  }

  static async getMyOrders(req, res, next) {
    const { userId } = req.currentUserId;
    const orders = await OrderService.getMyOrders(userId);
    return res.status(200).json(orders);
  }

  static async getMyOrder(req, res, next) {
    const { orderId } = req.params;
    const order = await OrderService.getOrder(orderId);
    return res.status(200).json(order);
  }

  // 사용자가 수정하는 경우 수량과 주소 요청사항?
  static async updateOrder() {
    const { orderId } = req.params;
    const { orderItems, address, request } = req.body;
    const updateInfo = {
      ...(orderItems && { orderItems }),
      ...(address && { address }),
      ...(totalPrice && { totalPrice }),
      ...(request && { request }),
    };
    const updatedOrder = await OrderService.updateOrder(orderId, updateInfo);

    res.status(200).json(updatedOrder);
  }

  static async getOrdersByAdmin(req, res, next) {
    const orders = await OrderService.getOrdersByAdmin();

    res.status(200).json(orders);
  }

  static async getOrderById() {
    const { orderId } = req.params;
    const order = await OrderService.getOrderById(orderId);

    res.status(200).json(order);
  }

  static async getOrdersByProduct() {
    const productId = req.params.productId;
    const orderItems = await OrderService.getItemsByProductId(productId);

    res.status(200).json(orderItems);
  }
  // 이건 소프트 딜리트임
  static async deleteMyOrder() {
    const orderId = req.params.orderId;
    const result = await OrderService.deleteMyOrder(orderId);

    res.status(200).json(result);
  }
  // 이건 진짜 딜리트임
  static async deleteOrder() {
    const { orderId } = req.params;
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  }
}

export { OrderController };
