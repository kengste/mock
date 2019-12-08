import { RoutesBuilder } from "./routes-builder.js";
import { Order } from "../models/orderModel.js";
import { Pizza } from "../models/pizzaModel.js";

export class Orders extends RoutesBuilder {
  buildRoutes() {
    this.buildGetRoute("/", this.getHandler);
    this.buildPostRoute("/", this.postHandler);
    this.buildPutRoute("/update", this.putHandler);
    return this.router;
  }

  async getHandler(req, res) {
    try {
      const results = await Order.find({});
      return res.status(200).json({ results });
    } catch (error) {}
  }

  async postHandler(req, res) {
    try {
      const { items, table } = req.body;
      const entry = new Order({ table, status: "preparing" });
      const order = await entry.save();
      const promises = items.map(item =>
        new Pizza({
          crust: item.crust,
          size: item.size,
          topping: item.topping,
          flavour: item.flavour,
          order: order._id
        }).save()
      );
      const pizzas = await Promise.all(promises);

      return res.status(201).json({
        results: {
          order,
          pizzas
        }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async putHandler(req, res) {
    try {
      const { _id } = req.body;
      const results = await Order.findOneAndUpdate({ _id }, req.body);
      return res.status(200).json(results);
    } catch (error) {}
  }
}
