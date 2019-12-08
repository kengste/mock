/* eslint-disable import/prefer-default-export */
import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="home">
      <div>
        <h2>Select Path</h2>
        <Link to="/orders">Customer</Link>
        <Link to="/login">Admin</Link>
      </div>
    </div>
  );
}
