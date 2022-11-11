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

  static async findUnknown(orderId, phoneNumber) {
    const order = await Order.findOne({ _id: orderId, phoneNumber });
    return order;
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

  static async updateStatus(orderIds, updateInfo) {
    const filter = { _id: { $in: orderIds } };
    const result = await Order.updateMany(filter, updateInfo);
    return result;
  }

  static async softDelete(orderId, updateInfo) {
    const filter = { _id: orderId };
    const result = await Order.updateOne(filter, updateInfo);
    return result;
  }

  static async delete(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }
}

export { OrderModel };
