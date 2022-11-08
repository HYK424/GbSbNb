import { AppError } from '../middlewares';
import { orderService } from '../services';

export const orderController = {
  getOrders: async (req, res) => {
    const state = req.query.state;

    const data = await orderService.getOrders(state);

    !data
      ? res.status(400).json({ message: '데이터를 불러오지 못했습니다.' })
      : res.status(200).json({ message: '데이터를 불러왔습니다.', data: data });
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

    const insertData = { userId, orderItems, address, payment };
    const resultData = await orderService.createMyOrders(insertData);

    // console.log(resultData);

    !resultData
      ? res.status(400).json({
          message: '주문을 실패하였습니다. 잠시후 다시 시도해주십시오.',
        })
      : res
          .status(200)
          .json({ message: '주문을 성공하였습니다..', data: resultData });

    //console.log(data);
  },
  getMyOrders: async (req, res) => {
    const userId = req.currentUserId;

    const data = await orderService.getMyOrders(userId);

    console.log(data);
  },
};
