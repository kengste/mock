/* eslint-disable react/no-array-index-key */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useStateValue } from "./state";
import { httpRequestsHandler } from "./httpRequestsHandler";

const HEADERS = ["Crust Types", "Flavour", "Size", "Topping", "Price"];

export const NewOrder = () => {
  const [state, setState] = useState({ price: 0 });
  const [order, setOrder] = useState({ items: [], table: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapSpecsIdToDetails, setMapSpecsIdToDetails] = useState({});
  const [{ pizzaSpecs }] = useStateValue();

  useEffect(() => {
    const changes = pizzaSpecs.reduce((acc, cur) => {
      acc[cur._id] = cur;
      return acc;
    }, {});
    setMapSpecsIdToDetails(changes);
  }, [pizzaSpecs.length]);

  useEffect(() => {
    const total =
      parseFloat((mapSpecsIdToDetails[state.crust] || {}).price || 0) +
      parseFloat((mapSpecsIdToDetails[state.flavour] || {}).price || 0) +
      parseFloat((mapSpecsIdToDetails[state.size] || {}).price || 0) +
      parseFloat((mapSpecsIdToDetails[state.topping] || {}).price || 0);
    setState(prevState => ({ ...prevState, price: total }));
  }, [state.crust, state.flavour, state.size, state.topping]);

  const translatePizzaSpecs = specs => {
    return specs.reduce((acc, cur) => {
      if (acc[cur.specType]) {
        acc[cur.specType].push(cur);
      } else {
        acc[cur.specType] = [cur];
      }
      return acc;
    }, {});
  };

  const handleInputChange = evt => {
    const { value, name } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOrderChange = evt => {
    const { value, name } = evt.target;
    setOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnAddPizza = evt => {
    evt.preventDefault();
    setOrder(prevState => ({
      ...prevState,
      items: prevState.items.concat(state)
    }));
  };

  const handleOnSubmitOrder = async evt => {
    evt.preventDefault();
    try {
      setIsProcessing(true);
      await httpRequestsHandler.postData("orders", order);
      setIsProcessing(false);
      window.location.href = "/orders";
    } catch (err) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="new-order">
      <Link to="/orders">View orders</Link>
      <br />
      <br />
      <br />
      <div className="pizza-menu">
        <form onSubmit={handleOnAddPizza}>
          <div className="form-field">
            {["crust", "flavour", "size", "topping"].map(spec => (
              <select
                key={spec}
                name={spec}
                value={state[spec]}
                required
                onChange={handleInputChange}
              >
                <option value="">{`Select ${spec}`}</option>
                {(translatePizzaSpecs(pizzaSpecs)[spec] || []).map(details => (
                  <option value={details._id} key={details._id}>
                    {details.name}
                  </option>
                ))}
              </select>
            ))}
          </div>
          <input
            type="submit"
            value={`Add pizza (${(state.price || {}).toFixed(2)})`}
          />
        </form>
      </div>
      <br />
      <br />
      <div className="table pizza-menu">
        <div className="table-header">
          {HEADERS.map(header => (
            <div className="table-cell" key={header}>
              {header}
            </div>
          ))}
        </div>
        <div className="table-body">
          {order.items.map((item, idx) => (
            <div key={idx} className="table-row">
              <div className="table-cell">
                {(mapSpecsIdToDetails[item.crust] || {}).name}
              </div>
              <div className="table-cell">
                {(mapSpecsIdToDetails[item.flavour] || {}).name}
              </div>
              <div className="table-cell">
                {(mapSpecsIdToDetails[item.size] || {}).name}
              </div>
              <div className="table-cell">
                {(mapSpecsIdToDetails[item.topping] || {}).name}
              </div>
              <div className="table-cell">{(item.price || {}).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={handleOnSubmitOrder}>
        <input
          type="number"
          name="table"
          placeholder="Enter table number"
          value={order.table}
          onChange={handleOrderChange}
          disabled={isProcessing}
          required
        />
        <input type="submit" disabled={isProcessing} value="Submit Order" />
      </form>
    </div>
  );
};
