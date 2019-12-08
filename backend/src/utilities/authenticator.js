import jwt from "jsonwebtoken";

const UNAUTHORIZED = "Unauthorized.";
const SECRET = "SECRET";

export class Authenticator {
  constructor() {
    this.checkAuth = this.checkAuth.bind(this);
    this.publicRoutes = [
      "/login",
      "/users/admin",
      "/orders",
      "/orders/update",
      "/pizzas",
      "/pizzaSpecs"
    ];
  }

  async authMiddleware(req, res, next) {
    try {
      const token = req.cookies.token;
      const { isAdmin, email } = await jwt.verify(token, SECRET);
      req.email = email;
      req.isAdmin = isAdmin;
    } catch (error) {
      throw Error(UNAUTHORIZED);
    }
  }

  async checkAuth(req, res, next) {
    try {
      if (this.publicRoutes.indexOf(req.path) !== -1) {
        return next();
      }
      await this.authMiddleware(req, res, next);
      next();
    } catch (error) {
      res.status(401).send({ error: UNAUTHORIZED });
    }
  }
}
