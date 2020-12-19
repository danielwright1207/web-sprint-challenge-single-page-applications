import React from "react";
// import Order from "./order";
export default function OrderSubmitted({ details }) {
  if (!details) {
    return <h3>Working on your order</h3>;
  }

  return (
    <div className="Order">
      <h1>Your pizza is on the way!</h1>
      <h3>Name: {details.name}</h3>
      <p> Size:{details.size} </p>
      {/* <p> Meat: {details.meat}</p>
          <p> veggies: {details.veggies}</p>
          <p> pineapple: {details.pineapple}</p>
          <p> sauce: {details.sauce}</p> */}

      <p>
        Toppings:
        {details.toppings.map((top) => {
          return <span> {top}</span>;
        })}
      </p>
      <p> specialinstructions: {details.specialinstructions}</p>
    </div>
  );
}
