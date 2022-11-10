import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      default: '비회원',
    },
    orderItems: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      default: 'standby',
      // enum: ['standby', 'delivery', 'completed', 'canceled'],
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        },
      ),
    },
    receiver: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    totalPrice: {
      type: Number,
      required: true,
    },
    request: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export { OrderSchema };
