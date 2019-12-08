import express from "express";

export class RoutesBuilder {
  constructor() {
    this.router = express.Router();
  }
  buildPostRoute(endpointUrl, handler) {
    this.router.route(endpointUrl).post(handler);

  }

  buildPutRoute(endpointUrl, handler) {
    this.router.route(endpointUrl).put(handler);

  }

  buildGetRoute(endpointUrl, handler) {
    this.router.route(endpointUrl).get(handler);
  }
}