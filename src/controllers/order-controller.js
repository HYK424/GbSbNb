import { AppError, commonErrors } from '../middlewares';
import { OrderService } from '../services';

export const orderController = {
  createOrder: async (req, res, next) => {
    const userId = req.userId || '비회원';
    const orderInfo = { userId, ...req.body };
    const newOrder = await OrderService.createOrder(orderInfo);

    return res.status(201).json(newOrder);
  },

  getOrders: async (req, res, next) => {
    const orders = await OrderService.getOrders();
    return res.status(200).json(orders);
  },

  getMyOrders: async (req, res, next) => {
    const { userId } = req;
    const orders = await OrderService.getMyOrders(userId);
    return res.status(200).json(orders);
  },

  cancelOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const { userId } = req;
    const updateInfo = { status: '주문 취소' };
    const result = await OrderService.cancelOrder(orderId, userId, updateInfo);
    if (!result.acknowledged) {
      throw new AppError(commonErrors.databaseError, 500);
    }
    return res.status(200).json('주문이 정상적으로 취소되었습니다 :)');
  },

  updateOrderStatus: async (req, res, next) => {
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
  },

  deleteMyOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const { userId } = req;
    const order = await OrderService.getOrder(orderId);
    if (order.userId !== userId) {
      throw new AppError(
        commonErrors.authorizationError,
        400,
        '해당 주문은 고객님의 주문이 아니에요 :(',
      );
    }
    const result = await OrderService.deleteMyOrder(orderId);
    if (!result.acknowledged) {
      throw new AppError(commonErrors.databaseError);
    }

    res.status(200).json({ message: '주문이 정상적으로 삭제되었습니다 😊' });
  },

  deleteOrder: async (req, res, next) => {
    const { orderId } = req.params;
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  },

  getOrderByUnknown: async (req, res) => {
    const { orderId, phoneNumber } = req.body;
    const order = await OrderService.getOrderByUnknown(orderId, phoneNumber);
    if (!order) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '해당 정보에 해당하는 주문을 찾을 수 없어요 :(',
      );
    }
    console.log(order);
    return res.status(200).json(order);
  },

  unknownUserOrderCancel: async (req, res) => {
    const { orderCode } = req.body;
    const updateInfo = { status: '주문 취소' };
    const result = await OrderService.cancleUnknownOrder(orderCode, updateInfo);
    const status = 200;
    const message = '주문 취소 성공';
    res.status(status).json({ message: message });
  },
};
