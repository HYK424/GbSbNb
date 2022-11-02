import { Schema } from 'mongoose';

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export { CartSchema };
