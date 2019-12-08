/* eslint-disable no-undef */
import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PizzaManagement } from "./PizzaManagement";
import { NewOrder } from "./NewOrder";
import { Login } from "./Login";
import { Orders } from "./Orders";
import { Register } from "./Register";
import { Home } from "./Home";
import { Statistics } from "./Statistics";
import { StateProvider } from "./state";
import { reducer } from "./reducers";
import { WithData } from "./WithData";
import "../styles/index.scss";

const initialState = {
  pizzaSpecs: [],
  orders: { items: [], table: "" },
  sales: {}
};

const wrap = component => {
  return (
    <>
      <WithData />
      {component}
    </>
  );
};

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/orders" exact render={() => wrap(<Orders />)} />
        <Route path="/orders/new" render={() => wrap(<NewOrder />)} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route
          path="/admin/management"
          render={() => wrap(<PizzaManagement />)}
        />
        <Route path="/admin/statistics" render={() => wrap(<Statistics />)} />
      </Switch>
    </Router>
  </StateProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
