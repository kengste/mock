import { Pizzas } from "../controllers/pizzas.js";
import { Users } from "../controllers/users.js";
import { PizzaSpecs } from "../controllers/pizzaSpecs.js";
import { Orders } from "../controllers/orders.js";

export class Routes {
  constructor() {
    this.pizzas = new Pizzas();
    this.users = new Users();
    this.pizzaSpecs = new PizzaSpecs();
    this.orders = new Orders();
  }

  routes(app) {
    app.use("/pizzas", this.pizzas.buildRoutes());
    app.use("/orders", this.orders.buildRoutes());
    app.use("/pizzaSpecs", this.pizzaSpecs.buildRoutes());
    app.use("/", this.users.buildRoutes());
    app.route("/").get((req, res) =>
      res.status(200).send({
        message: "GET request successfulll!!!!"
      })
    );
  }
}
