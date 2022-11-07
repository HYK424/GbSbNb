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
        eachPrice: {
          type: Number,
          required: true,
        },
        totalItemPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    state: {
      type: String,
      default: 'standby',
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

    // totalprice: {
    //   type: Number,
    //   required: true,
    // },

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
  { timestamps: true },
);

export { OrderSchema };
