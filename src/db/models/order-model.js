import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order2-schema';

const Order = model('order', OrderSchema);

export class OrderModel {
  async findOrder(state) {
    console.log('모델');
    const filter = state;
    console.log(state === undefined);
    const orders =
      state === undefined
        ? await Order.find({})
        : await Order.find({ state: state });

    return orders;
  }

  async findThisState(email) {
    const user = await Order.findOne({ email });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await Order.create(userInfo);
    return createdNewUser;
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
