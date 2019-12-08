/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./state";

const HEADERS = [
  "Order ID",
  "Crust",
  "Flavour",
  "Size",
  "Topping",
  "Price (SGD)"
];

export function Statistics() {
  const [{ orders, sales }] = useStateValue();
  return (
    <div className="statistics">
      <Link to="/admin/management">Menu Management</Link>

      <h2>Sales Overview by pizza specs</h2>
      <div className="table pizza-menu">
        <div className="table-header">
          {["Pizza spec", "Name", "Unit Price (SGD)", "Total Sales (SGD)"].map(
            header => (
              <div className="table-cell" key={header}>
                {header}
              </div>
            )
          )}
        </div>
        <div className="table-body">
          {Object.keys(sales).map(spec =>
            Object.keys(sales[spec]).map(row => (
              <div key={row} className="table-row">
                <div className="table-cell">{spec}</div>
                <div className="table-cell">{sales[spec][row].name}</div>
                <div className="table-cell">
                  {sales[spec][row].price.toFixed(2)}
                </div>
                <div className="table-cell">
                  {(
                    sales[spec][row].price *
                    (sales[spec][row].pizzaIds || {}).length
                  ).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h2>Sales Breakdown by individual pizzas sales</h2>
      <div className="table pizza-menu">
        <div className="table-header">
          {HEADERS.map(header => (
            <div className="table-cell" key={header}>
              {header}
            </div>
          ))}
        </div>
        <div className="table-body">
          {Object.keys(orders).map(orderId =>
            (orders[orderId].items || []).map(item => (
              <div className="table-row" key={item._id}>
                <div className="table-cell">{orderId}</div>
                <div className="table-cell">{item.crust.name}</div>
                <div className="table-cell">{item.flavour.name}</div>
                <div className="table-cell">{item.size.name}</div>
                <div className="table-cell">{item.topping.name}</div>
                <div className="table-cell">
                  {(
                    item.crust.price +
                    item.flavour.price +
                    item.size.price +
                    item.topping.price
                  ).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
