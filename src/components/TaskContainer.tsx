import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { Todo } from "../types/types";
import classes from "../styles.module.css";
import EditModal from "./EditModal";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const { removeTodo }: any = useContext(TodosContext);
  const { toggleComplete }: any = useContext(TodosContext);

  function handleDelete() {
    removeTodo(todo);
  }

  function handleComplete() {
    toggleComplete(todo);
  }

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          p: 1,
          m: 1,
        }}
      >
        <Box className={classes.box} sx={{ p: 1, width: "5%" }}>
          <Checkbox onChange={handleComplete} checked={todo.isCompleted} />
        </Box>
        <Box className={classes.box} sx={{ p: 1, width: "25%" }}>
          {todo.task}
        </Box>
        <Box className={classes.box} sx={{ p: 1, width: "20%" }}>
          {todo.deadline}
        </Box>
        <Box className={classes.box} sx={{ p: 1, width: "10%" }}>
          {todo.startTime}
        </Box>
        <Box className={classes.box} sx={{ p: 1, width: "10%" }}>
          {todo.endTime}
        </Box>
        <Box
          className={classes.box}
          sx={{ p: 1, width: "5%", justifyContent: "center" }}
        >
          <EditModal selectedTodo={todo} />
        </Box>
        <Box
          className={classes.box}
          sx={{ p: 1, width: "5%", justifyContent: "center" }}
        >
          <DeleteIcon onClick={handleDelete} color="action" />
        </Box>
      </Box>
    </div>
  );
};

export default TodoListItem;
