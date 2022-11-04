import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    state: {
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
      require: false,
    },

    completedAt: {
      type: Date,
      require: false,
    },

    retransferedAt: {
      type: Date,
      require: false,
    },
  },
  {
    timestamps: true,
  },
);

export { OrderSchema };
