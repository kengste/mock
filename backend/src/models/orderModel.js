import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    table: String,
    status: {
      type: String,
      enum: ["preparing", "served", "paid"]
    }
  },
  { timestamps: false }
);

export const Order = mongoose.model("Order", orderSchema);
