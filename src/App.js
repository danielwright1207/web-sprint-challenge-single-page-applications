import React from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import Order from "./components/order";
import Submitted from "./components/submitted";

const App = () => {
  const history = useHistory();
  return (
    <>
      <h1>Lambda Eats</h1>
      <Route path="/" onClick={() => history.push("/")}>
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
    </>
  );
};
export default App;
