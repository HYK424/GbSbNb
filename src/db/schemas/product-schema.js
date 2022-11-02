import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    view: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestams: true },
);

export { ProductSchema };
