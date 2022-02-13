import React, { useReducer } from "react";
import "./Product.css";
// import { getTotal } from "./GetTotal";

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const getTotal = (cart) => {
  const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, currencyOptions);
};

const products = [
  {
    emoji: "🍦",
    name: "ice cream",
    price: 5,
  },
  {
    emoji: "🍩",
    name: "donuts",
    price: 2.5,
  },
  {
    emoji: "🍉",
    name: "watermelon",
    price: 4,
  },
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.product];
    case "remove":
      const productIndex = state.findIndex(
        (item) => item.name === action.product.name
      );
      if (productIndex < 0) {
        return state;
      }
      const update = [...state];
      update.splice(productIndex, 1);
      return update;
    default:
      return state;
  }
};

function Product() {
  const [cart, setCart] = useReducer(cartReducer, []);
  //   const [total, setTotal] = useReducer(totalReducer, 0);

  //    const reducer = (state, action) => {
  //     switch (action.type) {
  //         case "add":
  //             return {count: state.count + 1}
  //             break;

  //         default:
  //             return state;
  //     }
  // }
  //      const [state, dispatch] = useReducer(reducer, initialState)
  //   ...onclick={()=>dispatch({type: "add"})}

  const add = (product) => {
    setCart({ product, type: "add" });
  };

  const remove = (product) => {
    setCart({ product, type: "remove" });
  };

  return (
    <div className="wrapper">
      <div>Shopping Cart: {cart.length} total items.</div>
      <br />
      <div>Total: {getTotal(cart)}</div>
      <br />
      <div className="product">
        {products.map((product) => (
          <>
            <div key={product.name}>
              <span role="img" aria-label={product.name}>
                {product.emoji}
              </span>
            </div>
            <button onClick={() => add(product)}>Add</button>
            <button onClick={() => remove(product)}>Remove</button>
          </>
        ))}
      </div>
    </div>
  );
}
export default Product;
