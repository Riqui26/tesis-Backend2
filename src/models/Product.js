import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: [String],
    default: [],
  },
  owner: {
    type: String,
    default: "admin",
  },
}, {
  timestamps: true,
});

export const productModel = model("products", productSchema);
