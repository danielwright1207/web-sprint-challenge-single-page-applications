import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import OrderSubmitted from "./submitted";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import schema from "./formSchema";

const initialOrderValues = {
  name: "",
  size: "",
  meat: false,
  veggies: false,
  pineapple: false,
  sauce: false,
  specialinstructions: "",
};

const initialFormErrors = {
  name: "",
  size: "",
  meat: false,
  veggies: false,
  pineapple: false,
  sauce: false,
  specialinstructions: "",
};
const initailOrder = [];
const initialDisabled = true;
console.log(initailOrder);

////// function starts here
export default function BuildPizza(props) {
  //   const { values, submit, change, disabled, errors } = props;

  const history = useHistory();
  const [orders, setOrders] = useState(initailOrder);
  const [orderValues, setOrderValues] = useState(initialOrderValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const postOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/users", newOrder)
      .then((res) => {
        setOrders([res.data, ...orders]);
        setOrderValues(initialOrderValues);
        console.log("hello");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formSubmit = () => {
    const newOrder = {
      name: orderValues.name.trim(),
      size: orderValues.size, //this is a dropdown
      specialinstructions: orderValues.specialinstructions,
      toppings: ["meat", "veggies", "pineapple", "sauce"].filter(
        (toppings) => orderValues[toppings]
      ),
    };
    postOrder(newOrder);
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name) // get to this part of the schema
      //we can then run validate using the value
      .validate(value) // validate this value
      .then(() => {
        // happy path and clear the error
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      // if the validation is unsuccessful, we can set the error message to the message
      // returned from yup (that we created in our schema)
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // validation error from schema
          [name]: err.errors[0],
        });
      });

    setOrderValues({
      ...orderValues,
      [name]: value, // NOT AN ARRAY
    });
  };
  useEffect(() => {
    schema.isValid(orderValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [orderValues]);

  console.log(orders);

  const onSubmit = (evt) => {
    evt.preventDefault();
    formSubmit();
  };
  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
  };

  return (
    <form className="form container" onSubmit={onSubmit} onChange={onChange}>
      <div>Build your pizza!</div>
      {/* 
      <div className="errors">
        <div>{errors.name}</div>
      </div> */}
      <label>
        Name on order
        <input
          type="text"
          name="name"
          placeholder="Enter name here"
          onChange={onChange}
          value={orderValues.name}
        ></input>
      </label>
      <br></br>
      <label>
        Choose a size
        <select name="size" value={orderValues.size} onChange={onChange}>
          <option value="">------select size------</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
      <div className="toppings">
        <h2>Select your toppings</h2>
        <label>
          Meat
          <input
            type="checkbox"
            value={orderValues.meat}
            name="meat"
            onChange={onChange}
          />
        </label>
        <label>
          Veggies
          <input
            type="checkbox"
            value={orderValues.veggies}
            name="veggies"
            onChange={onChange}
          />
        </label>
        <label>
          Pineapple
          <input
            type="checkbox"
            value={orderValues.pineapple}
            name="pineapple"
            onChange={onChange}
          />
        </label>
        <label>
          Sauce
          <input
            type="checkbox"
            value={orderValues.sauce}
            name="sauce"
            onChange={onChange}
          />
        </label>
      </div>
      <label>
        Special Instructions
        <input type="text" name="specialinstructions" onChange={onChange} />
      </label>
      <br></br>
      {/* <Link
        to="/submitted"
        className="submit-button"
        onClick={() => history.push("/submitted")}
      > */}
      <button>Submit Order</button>
      {/* </Link>
      <Route path="/submitted">
              <OrderSubmitted details={orders}/>
      </Route> */}
      {orders.map((pizza) => {
        return <OrderSubmitted key={pizza.id} details={pizza} />;
      })}
    </form>
  );
}
