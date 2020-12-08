import { useState } from "react";

export const useInput = (init = {}) => {
  const [form, setForm] = useState(init);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return [form, handleInput];
};
