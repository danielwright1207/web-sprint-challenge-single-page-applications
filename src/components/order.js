import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import Submitted from "./submitted";
import { useHistory } from "react-router-dom";

// const { url } = useRouteMatch();

export default function BuildPizza(props) {
  const history = useHistory();
  return (
    <form className="form container">
      <div>Build your pizza!</div>
      <label>
        Name on order
        <input type="text" placeholder="Enter name here"></input>
      </label>
      <br></br>
      <label>
        Choose a size
        <select name="size">
          <option value="">------select size------</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
      <div>
        <h2>Select your toppings</h2>
        <label>
          Meat
          <input type="checkbox" name="meat" />
        </label>
        <label>
          Veggies
          <input type="checkbox" name="veggies" />
        </label>
        <label>
          Pineapple
          <input type="checkbox" name="pineapple" />
        </label>
        <label>
          Sauce
          <input type="checkbox" name="sauce" />
        </label>
        <label>
          Special Instructions
          <input type="text" name="special-instructions" />
        </label>
        <br></br>
        <Link
          to="/submitted"
          className="submit-button"
          onClick={() => history.push("/submitted")}
        >
          <button>Submit Order</button>
        </Link>
        <Route path="/submitted">
          <Submitted />
        </Route>
      </div>
    </form>
  );
}
