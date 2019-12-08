import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pizzaSpecSchema = new Schema(
  {
    name: String,
    price: Number,
    specType: {
      type: String,
      enum: ["crust", "flavour", "topping", "size"]
    }
  },
  { timestamps: false }
);

export const PizzaSpec = mongoose.model("PizzaSpec", pizzaSpecSchema);
