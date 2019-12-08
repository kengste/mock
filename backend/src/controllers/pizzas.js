import { RoutesBuilder } from "./routes-builder.js";
import { Pizza } from "../models/pizzaModel.js";

export class Pizzas extends RoutesBuilder {
  buildRoutes() {
    this.buildGetRoute("/", this.getHandler);
    this.buildGetRoute("/:orderId", this.getIdHandler);
    this.buildPostRoute("/", this.postHandler);
    return this.router;
  }

  async getHandler(req, res) {
    try {
      const results = await Pizza.find({}).populate([
        "order",
        "crust",
        "size",
        "flavour",
        "topping"
      ]);
      return res.status(200).json({ results });
    } catch (error) {}
  }

  async getIdHandler(req, res) {
    try {
      const { orderId } = req.params;
      const results = await Pizza.find({ order: orderId });
      return res.status(200).json({ results });
    } catch (error) {}
  }

  async postHandler(req, res) {
    try {
      const entry = new Pizza(req.body);
      const results = await entry.save();
      return res.status(201).json(results);
    } catch (error) {}
  }
}
