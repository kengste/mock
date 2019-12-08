import { RoutesBuilder } from "./routes-builder.js";
import { PizzaSpec } from "../models/pizzaSpecModel.js";

export class PizzaSpecs extends RoutesBuilder {
  buildRoutes() {
    this.buildGetRoute("/", this.getHandler);
    this.buildPostRoute("/new", this.postHandler);
    return this.router;
  }

  async getHandler(req, res) {
    try {
      const results = await PizzaSpec.find({});
      return res.status(200).json({ results });
    } catch (error) {}
  }

  async postHandler(req, res) {
    try {
      // TODO: REFACTOR admin rights check to middleware
      if (!req.isAdmin) {
        throw Error("Unauthorised!");
      }
      const entry = new PizzaSpec(req.body);
      const results = await entry.save();
      return res.status(201).json(results);
    } catch (error) {
      res.status(401).send({ error: "Unauthorised!" });
    }
  }
}
