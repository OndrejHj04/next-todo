"use client";
import { Badge, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import Link from "next/link";
import { doc, updateDoc, writeBatch } from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "./firebase";
import { AppContext } from "./ContextProvider";
import RevalidateDashboard from "./RevalidateDashboard";

export default function FunctionalButtons() {
  const batch = writeBatch(db);
  const { checked, setChecked } = useContext(AppContext);
  const invertedType = (type: "todos" | "dones") =>
    type === "todos" ? "dones" : "todos";

  const setData = (type: "todos" | "dones") => {
    checked?.[invertedType(type)].map((item) => {
      batch.update(doc(db, "tasks", item), {
        type: type,
        success_time:
          type === "dones" ? dayjs().format("DD. MM. YYYY HH:mm") : null,
      });
    });
    batch.commit().then(() => RevalidateDashboard());
    setChecked((c) => ({ ...c, [invertedType(type)]: [] }));
  };

  const handleDelete = async () => {
    const forDelete = [...checked?.dones, ...checked?.todos];
    forDelete.forEach((item) => {
      batch.delete(doc(db, "tasks", item));
    });
    setChecked({ dones: [], todos: [] });
    batch.commit().then(() => RevalidateDashboard());
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <Badge badgeContent={checked?.todos.length} color="success">
        <Button
          onClick={() => setData("dones")}
          variant="contained"
          disabled={!checked?.todos || !checked.todos.length}
        >
          <ArrowForwardIcon />
        </Button>
      </Badge>
      <Badge badgeContent={checked?.dones.length} color="error">
        <Button
          onClick={() => setData("todos")}
          variant="contained"
          disabled={!checked?.dones || !checked.dones.length}
        >
          <ArrowBackIcon />
        </Button>
      </Badge>
      <Link href={"?modal=new-todo"}>
        <Button variant="contained">New Todo</Button>
      </Link>
      <Button
        variant="contained"
        onClick={handleDelete}
        color="error"
        disabled={!checked?.todos.length && !checked?.dones.length}
      >
        Delete cards
      </Button>
    </div>
  );
}
