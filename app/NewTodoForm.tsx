"use client";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { db } from "./firebase";
import RevalidateDashboard from "./RevalidateDashboard";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};

export default function NewTodoForm() {
  const batch = writeBatch(db);
  const [form, setForm] = useState<{
    task_name: string;
    estimated_time: null | dayjs.Dayjs;
  }>({
    task_name: "",
    estimated_time: null,
  });
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc(collection(db, "tasks"), {
      task_name: form.task_name,
      estimated_time: form.estimated_time?.format("HH:mm"),
      created_time: dayjs().format("DD. MM. YYYY HH:mm"),
      updated_time: null,
      success_time: null,
      type: "todos",
    }).then(() => RevalidateDashboard());
    handleClose();
  };

  return (
    <Modal open={modal === "new-todo"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Paper sx={style} className="p-2 flex flex-col gap-2">
          <Typography className="text-center" variant="h5">
            Create new Todo
          </Typography>
          <TextField
            label="Task"
            value={form.task_name}
            onChange={(e) =>
              setForm({
                estimated_time: form.estimated_time,
                task_name: e.target.value,
              })
            }
          />
          <TimePicker
            ampm={false}
            label="Estimated time"
            value={form.estimated_time}
            onChange={(e) =>
              setForm({ task_name: form.task_name, estimated_time: e })
            }
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Paper>
      </form>
    </Modal>
  );
}
