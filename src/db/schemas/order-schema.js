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
      enum: ['상품 준비중', '배송 중', '배송 완료'],
      default: '상품 준비 중',
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
