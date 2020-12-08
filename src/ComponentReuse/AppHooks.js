import React from "react";
import InputComponent from "./InputComponent";
import { useInput } from "./hooks";

export default function App() {
  const [form, handleInput] = useInput();

  return (
    <>
      {DATA.map(input => (
        <InputComponent
          key={input.name}
          name={input.name}
          text={input.text}
          value={form[input.name]}
          handleInput={handleInput}
          handleValid={validateReducer[input.name]}
        />
      ))}
    </>
  );
}

const validateReducer = {
  id: input => input?.length >= 6,
  password: input => input?.length >= 8,
  email: input => input?.includes("@" && ".com"),
};

const DATA = [
  {
    name: "id",
    text: "아이디",
  },
  {
    name: "password",
    text: "비밀번호",
  },
  {
    name: "email",
    text: "이메일",
  },
];
