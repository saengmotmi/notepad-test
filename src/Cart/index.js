import React, { useState } from "react";
import useCart from "./useCart";

const items = [
  { name: "유칼립투스", quantity: 1, price: 48000, isChecked: false },
  { name: "실거베라", quantity: 1, price: 33400, isChecked: false },
  { name: "디디스커스", quantity: 1, price: 54000, isChecked: false },
  { name: "옥스포드", quantity: 1, price: 23000, isChecked: false },
];

const style = { width: "80px" };

export default function Index() {
  const [cart, setCart, { totalPrice, totalQuantity }] = useCart(items);

  return (
    <div>
      <tr>
        <td style={style}>체크</td>
        <td style={style}>이름</td>
        <td style={style}>수량</td>
        <td style={style}>가격</td>
      </tr>
      <tr>
        <input
          type="checkbox"
          data-type="checkbox-all"
          onClick={setCart}
          checked={cart.every(item => item.isChecked)}
        />
      </tr>
      {cart.map((item, idx) => (
        <tr>
          <td>
            <input
              type="checkbox"
              data-type="checkbox"
              data-idx={idx}
              onClick={setCart}
              checked={item.isChecked}
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button data-type="calc" data-idx={idx} onClick={setCart}>
              -
            </button>
            {item.quantity}
            <button data-type="calc" data-idx={idx} onClick={setCart}>
              +
            </button>
          </td>
          <td>{item.price}</td>
        </tr>
      ))}
      <li>총 수량 : {totalQuantity}</li>
      <li>총 가격 : {totalPrice}</li>
    </div>
  );
}
