"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { StateType } from "./layout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const AppContext = createContext<{
  checked: StateType;
  setChecked: Dispatch<SetStateAction<StateType>>;
}>({
  checked: { todos: [], dones: [] },
  setChecked: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState<StateType>({
    todos: [],
    dones: [],
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContext.Provider value={{ checked, setChecked }}>
        {children}
      </AppContext.Provider>
    </LocalizationProvider>
  );
}
