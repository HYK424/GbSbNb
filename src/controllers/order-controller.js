import { AppError } from '../middlewares';
import { orderService } from '../services';

export const orderController = {
  getOrders: async (req, res) => {
    const state = req.query.state;

    const data = await orderService.getOrders(state);

    if (!data) {
      res.status(400).json({ message: '데이터를 불러오지 못했습니다.' });
    }

    res.status(200).json({ message: '데이터를 불러왔습니다.', data: data });
  },

  createMyOrders: async (req, res) => {
    const userId = req.currentUserId;
    const { orderItems, address, payment } = req.body;

    for (let i = 0; i < orderItems.length; i++) {
      const calc = orderItems[i].quantity * orderItems[i].eachPrice;

      if (calc != orderItems[i].totalItemPrice) {
        throw new AppError('상품 계산결과가 맞지 않습니다.');
      }
    }

    const data = { userId, orderItems, address, payment };
    const test = await orderService.createMyOrders(data);
    //console.log(data);
  },
  getMyOrders: async (req, res) => {
    const userId = req.currentUserId;

    const data = await orderService.getMyOrder(userId);
  },
};
