import React from "react";

export default function InputComponent({
  text,
  name,
  value,
  handleInput,
  handleValid,
}) {
  const valid = handleValid(value);

  return (
    <div style={{ marginBottom: "15px" }}>
      <span>{text}</span>
      <input
        name={name}
        type={name.includes("password") ? "password" : "text"}
        onChange={handleInput}
      />
      <span style={{ color: valid ? "blue" : "red" }}>
        {valid ? "성공" : "실패"}
      </span>
    </div>
  );
}
