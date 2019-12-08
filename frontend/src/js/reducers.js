/* eslint-disable import/prefer-default-export */
import { ACTION_TYPES } from "./constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCHED_PIZZA_SPECS:
      return { ...state, pizzaSpecs: action.data.pizzaSpecs };
    case ACTION_TYPES.FETCHED_ORDERS_AND_SALES:
      return {
        ...state,
        orders: action.data.orders,
        sales: action.data.sales
      };
    default:
      return state;
  }
};
