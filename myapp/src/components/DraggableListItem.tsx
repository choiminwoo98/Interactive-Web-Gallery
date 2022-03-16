import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import InboxIcon from "@material-ui/icons/Inbox";
import { useDynamicList } from "ahooks";

import { Item } from "../typings";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
  button: {
    backgroundColor: "#3c52b2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

export type DraggableListItemProps = {
  item: Item;
  index: number;
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        primary: string;
        secondary: string;
      }[]
    >
  >;
};

const DraggableListItem = ({
  item,
  index,
  setItems,
}: DraggableListItemProps) => {
  const classes = useStyles();

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : " "}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.primary} secondary={item.secondary} />
          <Button
            className={classes.button}
            onClick={(pre) => {
              
              setItems((pre) => [...pre]);
            }}
          >
            delete
          </Button>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
