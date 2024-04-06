import { style } from "@/app/NewTodoForm";
import TodoPage from "@/app/todo/[id]/page";
import { Icon, IconButton, Modal, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

export default function ModalTodo({ params }: { params: { id: string } }) {
  return (
    <Modal open={true}>
      <Paper style={style} className="p-2 relative">
        <Link href={"/"} className="absolute right-1 top-1">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Link>
        <TodoPage params={params} />
      </Paper>
    </Modal>
  );
}
