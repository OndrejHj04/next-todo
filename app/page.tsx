import { Divider, List, Typography } from "@mui/material";
import SingleListItem from "./SingleListItem";
import FunctionalButtons from "./FunctionalButtons";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export interface DataType {
  task_name: string;
  estimated_time: string;
  created_time: string;
  updated_time: string | null;
  success_time: string | null;
  type: "todos" | "dones";
}

export interface LocalDataType extends DataType {
  id: string;
}

const getTasks = async () => {
  const store: { todos: LocalDataType[]; dones: LocalDataType[] } = {
    todos: [],
    dones: [],
  };
  const data = await getDocs(collection(db, "tasks"));
  data.forEach((doc) => {
    const docData = doc.data() as DataType;
    store[docData.type].push({ id: doc.id, ...docData });
  });
  return store;
};

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="mx-auto w-full max-w-4xl my-5">
      <Typography variant="h4" className="font-semibold text-center">
        Next.js todo app
      </Typography>
      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <Typography variant="h5" className=" text-center">
            Todo
          </Typography>
          <Divider />
          <List>
            {tasks.todos.map((todo, i) => (
              <SingleListItem key={i} todo={todo} type="todos" />
            ))}
          </List>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <FunctionalButtons />
        </div>
        <div className="w-full">
          <Typography variant="h5" className=" text-center">
            Done
          </Typography>
          <Divider />
          <List>
            {tasks.dones.map((todo, i) => (
              <SingleListItem key={i} todo={todo} type="dones" />
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
