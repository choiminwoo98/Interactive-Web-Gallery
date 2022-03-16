import React, { SetStateAction } from "react";
import DraggableListItem from "./DraggableListItem";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { Item } from "../typings";
import { Button } from "@material-ui/core";
import { getItems, reorder } from "../helpers";

export type DraggableListProps = {
  items: Item[];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        primary: string;
        secondary: string;
      }[]
    >
  >;
  onDragEnd: OnDragEndResponder;
};

const DraggableList = React.memo(
  ({ items, onDragEnd, setItems }: DraggableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DraggableListItem
                  item={item}
                  index={index}
                  key={item.id}
                  setItems={function (
                    value: SetStateAction<
                      { id: string; primary: string; secondary: string }[]
                    >
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          onClick={() => {
            setItems((pre) => [
              ...pre,
              { id: pre.length + "", primary: `앨범+`, secondary: `앨범내용` },
            ]);
          }}
        >
          Item Insert
        </Button>
      </DragDropContext>
    );
  }
);

export default DraggableList;
