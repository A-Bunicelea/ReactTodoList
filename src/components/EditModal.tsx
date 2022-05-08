import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TodoForm from "./TodoForm";
import EditIcon from "@mui/icons-material/Edit";

export default function FormDialog({ selectedTodo }: any) {
  const [open, setOpen] = React.useState(false);
  const { updateTodo }: any = useContext(TodosContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon color="action" onClick={handleClickOpen}></EditIcon>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ width: "450px", padding: 0 }}>
          <TodoForm
            item={selectedTodo}
            updateTodo={updateTodo}
            editMode={true}
            closeDialog={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
