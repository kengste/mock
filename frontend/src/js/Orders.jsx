/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./state";

export function Orders() {
  const [{ orders }] = useStateValue();

  return (
    <div className="orders">
      <Link to="/orders/new">Create a new order</Link>
      <br />
      <br />
      <br />
      <div className="cards">
        {Object.keys(orders).map(orderId => (
          <div className="card" key={orderId}>
            <h3>{`Table ${orders[orderId].table} (${orders[orderId].status})`}</h3>
            {(orders[orderId].items || []).map(item => (
              <div key={item._id}>
                <div className="list-item">{`Crust - ${item.crust.name}`}</div>
                <div className="list-item">{`Flavour - ${item.flavour.name}`}</div>
                <div className="list-item">{`Size - ${item.size.name}`}</div>
                <div className="list-item">{`Topping - ${item.topping.name}`}</div>
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
