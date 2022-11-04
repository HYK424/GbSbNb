import { model } from 'mongoose';
import { shippingSchema } from '../schemas/shipping-schema';

const Shipping = model('shipping', shippingSchema);

export class ShippingModel {
  async findAll(state) {
    console.log('모델');
    const filter = state;
    const users = await Shipping.find();
    return users;
  }

  async findThisState(email) {
    const user = await Shipping.findOne({ email });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await Shipping.create(userInfo);
    return createdNewUser;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);

    return updatedUser;
  }
}

const shippingModel = new ShippingModel();
export { shippingModel };
