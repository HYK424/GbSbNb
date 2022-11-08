import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        title: {
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
      default: '상품 준비 중',
    },
    address: {
      type: new Schema(
        {
          zipCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        },
      ),
    },
    totalprice: {
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
