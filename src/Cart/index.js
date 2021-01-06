import React, { useState } from "react";

const items = [
  { name: "유칼립투스", quantity: 1, price: 48000, isChecked: false },
  { name: "실거베라", quantity: 1, price: 33400, isChecked: false },
  { name: "디디스커스", quantity: 1, price: 54000, isChecked: false },
  { name: "옥스포드", quantity: 1, price: 23000, isChecked: false },
];

export default function Index() {
  const [cart, setCart] = useState(items);

  const totalQuantity = sumQuantity(cart);
  const totalPrice = sumPrice(cart);

  const handleQuantity = (sign, targetIdx) => {
    const count = sign === "+" ? 1 : -1;

    const updatedCarts = cart.map((item, idx) =>
      updateCart(item, idx, "quantity", item["quantity"] + count, targetIdx)
    );

    setCart(updatedCarts);
  };

  const handleCheck = targetIdx => {
    const updatedCarts = cart.map((item, idx) =>
      updateCart(item, idx, "isChecked", !item.isChecked, targetIdx)
    );
    setCart(updatedCarts);
  };

  const allOrNothing = () => {
    const isAllChecked = cart.every(item => item.isChecked);

    setCart(cart.map(item => ({ ...item, isChecked: !isAllChecked })));
  };

  return (
    <div>
      <tr>
        <td style={{ width: "50px" }}>체크</td>
        <td style={{ width: "100px" }}>이름</td>
        <td style={{ width: "100px" }}>수량</td>
        <td style={{ width: "100px" }}>가격</td>
      </tr>
      <tr>
        <input
          type="checkbox"
          onClick={allOrNothing}
          checked={cart.every(item => item.isChecked)}
        />
      </tr>
      {cart.map((item, idx) => (
        <tr>
          <td>
            <input
              type="checkbox"
              onClick={() => handleCheck(idx)}
              checked={item.isChecked}
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button onClick={() => handleQuantity("-", idx)}>-</button>
            {item.quantity}
            <button onClick={() => handleQuantity("+", idx)}>+</button>
          </td>
          <td>{item.price}</td>
        </tr>
      ))}
      <li>총 수량 : {totalQuantity}</li>
      <li>총 가격 : {totalPrice}</li>
    </div>
  );
}

const sumQuantity = arr => {
  return arr.reduce((acc, { quantity, isChecked }) => {
    if (!isChecked) return acc;
    return acc + quantity;
  }, 0);
};

const sumPrice = arr => {
  return arr.reduce((acc, { quantity, price, isChecked }) => {
    if (!isChecked) return acc;
    return acc + quantity * price;
  }, 0);
};

const updateCart = (item, idx, key, action, targetIdx) => {
  if (idx !== targetIdx) return item;
  return { ...item, [key]: action };
};
