import { Schema } from 'mongoose';

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: String,
        default: [],
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export { CartSchema };
