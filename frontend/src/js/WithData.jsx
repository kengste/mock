/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import React, { useEffect } from "react";
import { useStateValue } from "./state";
import { httpRequestsHandler } from "./httpRequestsHandler";
import { ACTION_TYPES } from "./constants";

export function WithData() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    async function fetching() {
      const { results } = await httpRequestsHandler.getData("pizzaSpecs");
      if (typeof results !== "undefined") {
        dispatch({
          type: ACTION_TYPES.FETCHED_PIZZA_SPECS,
          data: { pizzaSpecs: results }
        });
      }
      const pizzas = await httpRequestsHandler.getData("pizzas");
      const sales = pizzas.results.reduce(
        (acc, cur) => {
          const { crust, flavour, size, topping } = cur;
          if (acc.crust[crust._id]) {
            acc.crust[crust._id].pizzaIds.push(cur._id);
          } else {
            acc.crust[crust._id] = {
              pizzaIds: [cur._id],
              name: crust.name,
              price: crust.price
            };
          }
          if (acc.flavour[flavour._id]) {
            acc.flavour[flavour._id].pizzaIds.push(cur._id);
          } else {
            acc.flavour[flavour._id] = {
              pizzaIds: [cur._id],
              name: flavour.name,
              price: flavour.price
            };
          }
          if (acc.size[size._id]) {
            acc.size[size._id].pizzaIds.push(cur._id);
          } else {
            acc.size[size._id] = {
              pizzaIds: [cur._id],
              name: size.name,
              price: size.price
            };
          }
          if (acc.topping[topping._id]) {
            acc.topping[topping._id].pizzaIds.push(cur._id);
          } else {
            acc.topping[topping._id] = {
              pizzaIds: [cur._id],
              name: topping.name,
              price: topping.price
            };
          }
          return acc;
        },
        { crust: {}, flavour: {}, size: {}, topping: {} }
      );

      const orders = pizzas.results.reduce((acc, cur) => {
        const { crust, flavour, size, topping } = cur;
        if (acc[cur.order._id]) {
          acc[cur.order._id].items.push({ crust, flavour, size, topping });
        } else {
          acc[cur.order._id] = {
            items: [{ crust, flavour, size, topping }],
            table: cur.order.table,
            status: cur.order.status
          };
        }
        return acc;
      }, {});
      dispatch({
        type: ACTION_TYPES.FETCHED_ORDERS_AND_SALES,
        data: { orders, sales }
      });

      return () => {
        new AbortController().abort();
      };
    }
    fetching();
  }, []);
  return <></>;
}
