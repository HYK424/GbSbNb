import { Schema } from 'mongoose';

const shippingSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
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
  { timestamps: true },
);

export { shippingSchema };
