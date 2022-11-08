import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const filter = { $or: [{ role: 'basic-user' }, { role: 'ADMIN_G' }] };
    const users = await User.find(filter);
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async changePassword({ userId, changedPassword }) {
    const filter = { _id: userId };
    const password = { password: changedPassword };
    const option = { returnOriginal: false };

    const changePassword = await User.findOneAndUpdate(
      filter,
      password,
      option,
    );

    return changePassword;
  }

  async delete(userId) {
    const user = await User.findOneAndUpdate({ _id: userId });
    return user;
  }

  async deleteUser(userId) {
    const filter = { _id: userId };
    const deleteAt = { deletedAt: Date.now() };
    const option = { returnOriginal: false };
    const deleteUser = await User.findByIdAndUpdate(filter, deleteAt, option);

    return deleteUser;
  }

  async updateRole(insertData) {
    const option = { returnOriginal: false };
    for (let i = 0; i < insertData.length; i++) {
      const updateRole = {
        role:
          Object.values(insertData[0]).join() === 'basic-user'
            ? 'ADMIN_G'
            : 'basic-user',
      };
      console.log(role);
      const user = await User.findOne({ _id: Object.keys(insertData[0]) });
      console.log(user);
      const filter = { _id: Object.keys(insertData[0]) };
      const updatedUser = await User.findOneAndUpdate(
        filter,
        updateRole,
        option,
      );
      console.log(updatedUser);
    }
  }
}

const userModel = new UserModel();

export { userModel };
