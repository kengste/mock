import { RoutesBuilder } from "./routes-builder.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const INCORRECT_EMAIL = "Incorrect email.";
const INCORRECT_PASSWORD = "Incorrect password";
const SECRET = "SECRET";

export class Users extends RoutesBuilder {
  buildRoutes() {
    // this.buildGetRoute("/users", this.getHandler);
    this.buildPostRoute("/users/admin", this.postHandler);
    this.buildPostRoute("/login", this.loginHandler);
    this.buildGetRoute("/admin", this.checkIsAdmin);
    return this.router;
  }

  //   async getHandler(req, res) {
  //     try {
  //       const results = await Pizza.find({});
  //       return res.status(200).json({ results });
  //     } catch (error) {}
  //   }

  async checkIsAdmin(req, res) {
    return res.status(200).send({ isAdmin: !!req.isAdmin });
  }

  async loginHandler(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (user === null) {
        throw Error(INCORRECT_EMAIL);
      }
      const isPasswordValid = await user.isPasswordValid(password);
      if (!isPasswordValid) {
        throw Error(INCORRECT_PASSWORD);
      }
      const payload = { email, isAdmin: user.isAdmin };
      const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
      return res.cookie("token", token, { httpOnly: true }).sendStatus(200);
    } catch (error) {
      return res.status(401).send({ error: error.message });
    }
  }

  async postHandler(req, res) {
    try {
      const { email, password } = req.body;
      const entry = new User({
        email,
        password,
        isAdmin: true
      });
      const results = await entry.save();
      return res.status(201).json(results);
    } catch (error) {
      return res
        .status(500)
        .send("Error registering new user please try again.");
    }
  }
}
