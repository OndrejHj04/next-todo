import { db } from "@/app/firebase";
import { LocalDataType } from "@/app/page";
import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";

const getDetail = async (id: string) => {
  const data = await getDoc(doc(db, "tasks", id));
  return data.data();
};

export default async function TodoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const detail = (await getDetail(id)) as LocalDataType;

  return (
    <div className="w-full max-w-3xl mx-auto m-2">
      <Typography variant="h4">{detail.task_name}</Typography>
      <Typography>Created: {detail.created_time}</Typography>
      <Typography>Estimated time: {detail.estimated_time}</Typography>
      <Typography>Updated time: {detail.updated_time || "never"}</Typography>
      <Typography>Success time: {detail.success_time || "never"}</Typography>
    </div>
  );
}
