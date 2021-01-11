import { useState, useCallback } from "react";

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

  const sumQuantityMemo = useCallback(sumQuantity, [cart]);
  const sumPriceMemo = useCallback(sumPrice, [cart]);
  const updateCartMemo = useCallback(updateCart, [cart]);

  const handleQuantity = e => {
    const count = e.target.innerText === "+" ? 1 : -1;

    updateCartMemo(
      "quantity",
      (item, key) => item[key] + count,
      +e.target.dataset.idx
    );
  };

  const handleCheck = e => {
    updateCartMemo(
      "isChecked",
      (item, key) => !item[key],
      +e.target.dataset.idx
    );
  };

  const handleAllChecked = () => {
    const isAllChecked = cart.every(item => item.isChecked);

    setCart(cart.map(item => ({ ...item, isChecked: !isAllChecked })));
  };

  const reducer = e => {
    const { type } = e.target.dataset;
    const tag = e.target.tagName;

    const setFunction = {
      BUTTON: {
        quantity: handleQuantity,
      },
      INPUT: {
        "checkbox-all": handleAllChecked,
        "checkbox-item": handleCheck,
      },
    };

    return setFunction[tag][type](e);
  };

  const calc = {
    totalPrice: sumQuantityMemo(),
    totalQuantity: sumPriceMemo(),
  };

  return [cart, reducer, calc];
};
