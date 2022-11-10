import { AppError, commonErrors } from '../middlewares';
import { OrderService } from '../services';

export const orderController = {
  createOrder: async (req, res, next) => {
    console.log(req.body);
    const orderInfo = { ...req.body };
    const newOrder = await OrderService.createOrder(orderInfo);

    return res.status(201).json(newOrder);
  },

  getOrders: async (req, res, next) => {
    const orders = await OrderService.getOrders();
    return res.status(200).json(orders);
  },
  // 이건 비회원을 위한 API임
  getOrderById: async (req, res, next) => {
    const { orderId } = req.body;
    const order = await OrderService.getOrderById(orderId);
    res.status(200).json(order);
  },

  getMyOrders: async (req, res, next) => {
    const userId = req.currentUserId;
    const orders = await OrderService.getMyOrders(userId);
    return res.status(200).json(orders);
  },

  getOrder: async (req, res, next) => {
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
  },

  updateOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const { orderItems, totalPrice, address, request } = req.body;
    const updateInfo = {
      ...(orderItems && { orderItems }),
      ...(address && { address }),
      ...(totalPrice && { totalPrice }),
      ...(request && { request }),
    };
    await OrderService.updateOrder(orderId, updateInfo);
    return res.sendStatus(200);
  },

  cancelOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const updateInfo = { status: 'canceled' };
    const result = await OrderService.cancelOrder(orderId, updateInfo);
    return res.send(200).json('주문이 정상적으로 취소되었습니다 :)');
  },

  updateOrderStatus: async (req, res, next) => {
    const { orderIds, status } = req.body;
    if (['delivery', 'completed'].indexOf(status) === -1) {
      throw new AppError(
        commonErrors.businessError,
        400,
        '올바른 배송 상태를 지정하여 다시 요청해주세요 :(',
      );
    }
    const result = await OrderService.updateOrderStatus(orderIds, status);
    res.sendStatus(200);
  },

  deleteMyOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const result = await OrderService.deleteMyOrder(orderId);

    res.status(200).json(result);
  },

  deleteOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  },
};
