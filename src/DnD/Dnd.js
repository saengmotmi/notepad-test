import React, { Children } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const DndWrapper = ({ children, handleChange }) => {
  return (
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const DndItem = ({ index, id, children }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) =>
        Children.map(children, (Child) => {
          const props = {
            ref: provided.innerRef,
            ...provided.dragHandleProps,
            ...provided.draggableProps,
          };

          return (
            <Child.type {...children.props} {...props}>
              {Child.props.children}
            </Child.type>
          );
        })
      }
    </Draggable>
  );
};
