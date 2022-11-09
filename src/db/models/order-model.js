import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

class OrderModel {
  static async create(orderInfo) {
    console.log(orderInfo);
    const newOrder = await Order.create(orderInfo);
    return newOrder;
  }

  static async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  static async findAllByUser(userId) {
    const orders = await Order.find({ userId, deletedAt: null });
    return orders;
  }

  static async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  static async update({ orderId, updateInfo }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const result = await Order.updateOne(filter, updateInfo, option);
    return result;
  }

  static async updateStatus(insertData) {
    const option = { returnOriginal: false };
    let count = 0;
    for (let i = 0; i < insertData.length; i++) {
      const updateRole = {
        role:
          Object.values(insertData[i]).join() === 'basic-user'
            ? 'ADMIN_G'
            : 'basic-user',
      };
      console.log(updateRole);
      const order = await Order.findOne({ _id: Object.keys(insertData[i]) });
      console.log(Order);
      const filter = { _id: Object.keys(insertData[i]) };
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        updateRole,
        option,
      );
      console.log(updatedOrder);
      count += 1;
    }
    if (count == insertData.length) {
      return true;
    }
  }

  static async softDelete(orderId, updateInfo) {
    const filter = { _id: orderId };
    const result = await Order.findOneAndUpdate(filter, updateInfo);
    return result;
  }

  static async delete(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }
}

export { OrderModel };
