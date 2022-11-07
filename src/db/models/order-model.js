import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('order', OrderSchema);

export class OrderModel {
  async getOrders(state, userId) {
    console.log(state);
    console.log(userId);
    console.log(state === undefined);
    console.log(userId === undefined);
    return state === undefined // 어드민이 보낸 state가 undefined인 경우
      ? await Order.find({}) // 모든데이터 검색
      : userId === undefined // 어드민은 userId를 보내지않음 => 일반유저만 userId를 보냄 / userId가 undefined인 경우
      ? await Order.find({ state: state }) // 어드민의 명령이므로 state로 필터링하여 보냄
      : await Order.find({ userId: userId }); // 유저의 명령이므로 userId로 필터링하여 보냄
  }

  async findThisState(email) {
    const user = await Order.findOne({ email });
    return user;
  }

  async createMyOrders(data) {
    const createMyOrders = await Order.create(data);
    // .then(() => {
    //   console.log('성공');
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    return createMyOrders;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);

    return updatedUser;
  }
}

const orderModel = new OrderModel();
export { orderModel };
