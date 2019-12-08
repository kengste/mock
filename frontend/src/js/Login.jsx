/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { httpRequestsHandler } from "./httpRequestsHandler";

export function Login() {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = evt => {
    const { value, name } = evt.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    await httpRequestsHandler.postData("login", state);
    history.push("/admin/statistics");
  };

  return (
    <div className="login">
      <Link to="/register">Register as a new admin user</Link>
      <br />
      <br />
      <br />
      <form onSubmit={handleOnSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={state.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={state.password}
          onChange={handleInputChange}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
