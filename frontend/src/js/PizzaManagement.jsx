/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { httpRequestsHandler } from "./httpRequestsHandler";
import { useStateValue } from "./state";
import { Menu } from "./Menu";
import { ACTION_TYPES } from "./constants";

export const PizzaManagement = () => {
  const [state, setState] = useState({
    specType: "crust",
    name: "",
    price: 0
  });

  const [, dispatch] = useStateValue();

  const handleAddItem = async evt => {
    evt.preventDefault();
    await httpRequestsHandler.postData("pizzaSpecs/new", state);
    const { results } = await httpRequestsHandler.getData("pizzaSpecs");
    if (typeof results !== "undefined") {
      dispatch({
        type: ACTION_TYPES.FETCHED_PIZZA_SPECS,
        data: { pizzaSpecs: results }
      });
    }
  };

  const handleInputChange = evt => {
    const { value, name } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="pizza-management">
      <Link to="/admin/statistics">Sales Statistics</Link>
      <form onSubmit={handleAddItem}>
        <br />
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Enter pizza specs title"
            value={state.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Enter unit price"
            value={state.price}
            onChange={handleInputChange}
            required
          />
          <select
            name="specType"
            value={state.specType}
            onChange={handleInputChange}
          >
            <option value="crust">Crust</option>
            <option value="flavour">Flavour</option>
            <option value="size">Size</option>
            <option value="topping">Additional Topping</option>
          </select>
        </div>
        <input type="submit" value="Add pizza specs" />
      </form>
      <Menu />
    </div>
  );
};
