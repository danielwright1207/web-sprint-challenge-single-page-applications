import React, { useEffect, useState } from "react";
import Order from "./components/order";
import OrderSubmitted from "./components/submitted";
import { useHistory } from "react-router-dom";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import schema from "./components/formSchema";

const App = () => {
  const history = useHistory();
  /////// return starts here

  return (
    <div className="wholething">
      <h1>Lambda Eats</h1>
      <Route path="/">
        <Link to="/">
          <button>Home</button>
        </Link>
      </Route>

      <Link
        to="/order"
        className="order-button"
        onClick={() => history.push("/order")}
      >
        <button>Want some pizza?</button>
      </Link>
      <Route path="/order">
        <Order />
      </Route>
      {/* <Link
        to="/submitted"
        className="submit-button"
        onClick={() => history.push("/submitted")}
      >
        <button>Submit Order</button>
      </Link>
      <Route path="/submitted">
        <OrderSubmitted details={orders} />
      </Route> */}

      {/* {orders.map((pizza) => {
        return <Order key={pizza.id} details={pizza} />;
      })} */}
    </div>
  );
};
export default App;
