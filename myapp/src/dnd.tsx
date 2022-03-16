import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { DropResult } from "react-beautiful-dnd";
import DraggableList from "./components/DraggableList";
import { getItems, reorder } from "./helpers";
import { useState } from "react";

const useStyles = makeStyles({
  flexPaper: {
    margin: 16,
    minWidth: 300,
  },
  root: {
    display: "flex",
    flexdirection: "row",
    flexWrap: "wrap",
  },
});

const options = [
  {
    name: "Enable backdrop (default)",
    scroll: false,
    backdrop: true,
  },
  {
    name: "Disable backdrop",
    scroll: false,
    backdrop: false,
  },
  {
    name: "Enable body scrolling",
    scroll: true,
    backdrop: false,
  },
  {
    name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];
export default function Dnd() {
  const classes = useStyles();
  const [items, setItems] = React.useState(getItems(10));

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.flexPaper}>
        <DraggableList
          setItems={setItems}
          items={items}
          onDragEnd={onDragEnd}
        />
      </Paper>
    </div>
  );
}
