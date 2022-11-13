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
      enum: ['상품 준비 중', '배송 중', '배송 완료', '주문 취소'],
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
  { collection: 'orders', timestamps: true },
);

export { OrderSchema };
