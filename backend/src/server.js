import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Routes } from "./routes/routes.js";
import { Authenticator } from "./utilities/authenticator.js";
import mongoose from "mongoose";
import cors from "cors";

class Server {
  constructor() {
    this.server = express();
    this.config();
    new Routes().routes(this.server);
    this.mongoSetup();
  }

  config() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(
      cors({
        origin: [/localhost/],
        credentials: true,
        exposedHeaders: ["Content-Disposition"]
      })
    );
    this.server.use(cookieParser());
    this.server.all("*", new Authenticator().checkAuth);
  }

  mongoSetup() {
    const databaseHost = "mongo";
    const databaseName = "pizzas";
    const databaseUrl = "mongodb://" + databaseHost + ":27017/" + databaseName;
    console.log("Try to connect to database: " + databaseUrl); // eslint-disable-line
    mongoose.Promise = global.Promise;
    mongoose
      .connect(databaseUrl, { useNewUrlParser: true, useCreateIndex: true })
      .catch(err => {
        console.log("Could not connect to database:", err); // eslint-disable-line
      });
  }
}

export const server = new Server().server;
