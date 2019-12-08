import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pizzaSchema = new Schema(
  {
    crust: { type: Schema.ObjectId, ref: "PizzaSpec" },
    size: { type: Schema.ObjectId, ref: "PizzaSpec" },
    flavour: { type: Schema.ObjectId, ref: "PizzaSpec" },
    topping: { type: Schema.ObjectId, ref: "PizzaSpec" },
    order: { type: Schema.ObjectId, ref: "Order" }
  },
  { timestamps: false }
);

export const Pizza = mongoose.model("Pizza", pizzaSchema);
