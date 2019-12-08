/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { useStateValue } from "./state";

const HEADERS = ["Pizza Specs Type", "Name", "Price (SGD)"];

export const Menu = () => {
  const [{ pizzaSpecs }] = useStateValue();

  return (
    <div className="table pizza-menu">
      <div className="table-header">
        {HEADERS.map(header => (
          <div className="table-cell" key={header}>
            {header}
          </div>
        ))}
      </div>
      <div className="table-body">
        {(pizzaSpecs || []).map(item => (
          <div key={item._id} className="table-row">
            <div className="table-cell">{item.specType}</div>
            <div className="table-cell">{item.name}</div>
            <div className="table-cell">{item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
