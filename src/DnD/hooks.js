import { useState, useCallback } from "react";

export function useTodos(init) {
  const [todos, setTodos] = useState(init);

  const handleChange = useCallback(({ source, destination }) => {
    if (!destination) return;

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    setTodos((prev) => {
      return reorder(prev, source.index, destination.index);
    });
  }, []);

  return { todos, handleChange };
}
