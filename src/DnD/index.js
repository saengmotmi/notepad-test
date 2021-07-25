import React, { forwardRef } from "react";
import styled from "styled-components";
import { DndWrapper, DndItem } from "./Dnd";
import { useTodos } from "./hooks";

export default () => {
  const { todos, handleChange } = useTodos(items);

  return (
    <DndWrapper handleChange={handleChange}>
      {todos.map(({ id, value }, index) => {
        return (
          <DndItem key={id} id={id} index={index}>
            <Card>{value}</Card>
          </DndItem>
        );
      })}
    </DndWrapper>
  );
};

const items = [
  { id: "1", value: 1 },
  { id: "2", value: 2 },
  { id: "3", value: 3 },
  { id: "4", value: 4 },
  { id: "5", value: 5 },
];

const Card = styled.div`
  border: 1px dashed gray;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  cursor: move;
`;
