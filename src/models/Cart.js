import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
    },
  ],
}, {
  timestamps: true,
});

export const cartModel = model("carts", cartSchema);
