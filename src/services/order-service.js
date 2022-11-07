import { userModel, productModel, orderModel } from '../db';

export const orderService = {
  getOrders: async (state) => {
    return orderModel.getOrders(state, undefined);
  },
  createMyOrders: async (data) => {
    console.log(data.userId);
    const checkMyOrder = orderModel.getOrders(data.userId);
    console.log(checkMyOrder);
    return orderModel.createMyOrders(data);
  },
  getMyOrders: async (userId) => {
    return orderModel.getOrders(undefined, userId);
  },
};
