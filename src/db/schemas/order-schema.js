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
      required: true,
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
      required: false,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    retransferedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  { collection: 'a', timestamps: true },
);

export { OrderSchema };
