import { useState } from "react";

export default (init = []) => {
  const [cart, setCart] = useState(init);

  const sumQuantity = () => {
    return cart.reduce((acc, { quantity, isChecked }) => {
      if (!isChecked) return acc;
      return acc + quantity;
    }, 0);
  };

  const sumPrice = () => {
    return cart.reduce((acc, { quantity, price, isChecked }) => {
      if (!isChecked) return acc;
      return acc + quantity * price;
    }, 0);
  };

  const updateCart = (key, action, targetIdx) => {
    const updatedCart = cart.map((item, idx) => {
      if (idx !== targetIdx) return item;
      return { ...item, [key]: action(item, key) };
    });

    setCart(updatedCart);
  };

  const handleQuantity = e => {
    const count = e.target.innerText === "+" ? 1 : -1;

    updateCart(
      "quantity",
      (item, key) => item[key] + count,
      +e.target.dataset.idx
    );
  };

  const handleCheck = e => {
    updateCart("isChecked", (item, key) => !item[key], +e.target.dataset.idx);
  };

  const allOrNothing = () => {
    const isAllChecked = cart.every(item => item.isChecked);

    setCart(cart.map(item => ({ ...item, isChecked: !isAllChecked })));
  };

  const reducer = e => {
    const { type } = e.target.dataset;
    const tag = e.target.tagName;

    const setFunction = {
      BUTTON: {
        calc: handleQuantity,
      },
      INPUT: {
        "checkbox-all": allOrNothing,
        checkbox: handleCheck,
      },
    };

    return setFunction[tag][type](e);
  };

  const totalQuantity = sumQuantity();
  const totalPrice = sumPrice();

  return [cart, reducer, { totalPrice, totalQuantity }];
};
