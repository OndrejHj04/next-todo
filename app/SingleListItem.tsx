"use client";
import {
  Button,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { LocalDataType } from "./page";
import Link from "next/link";
import { AppContext } from "./ContextProvider";

export default function SingleListItem({
  todo,
  type,
}: {
  todo: LocalDataType;
  type: "todos" | "dones";
}) {
  const { checked, setChecked } = useContext(AppContext);

  const handleCheck = () => {
    if (checked[type].includes(todo.id)) {
      setChecked((c) => ({
        ...c,
        [type]: [...c[type].filter((i) => i !== todo.id)],
      }));
    } else {
      setChecked((c) => ({ ...c, [type]: [...c[type], todo.id] }));
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <Checkbox
          checked={checked[type].includes(todo.id)}
          onClick={handleCheck}
        />
      </ListItemIcon>
      <ListItemText
        primary={todo.task_name}
        secondary={`Estimated time ${todo.estimated_time.split(":")[0]} hours ${
          todo.estimated_time.split(":")[1]
        } minutes`}
      />
      <Link href={`/todo/${todo.id}`}>
        <Button variant="outlined">detail</Button>
      </Link>
    </ListItem>
  );
}
