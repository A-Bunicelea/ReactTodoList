import React, { useState, ChangeEvent } from "react";
import { Todo, AddTodo, UpdateTodo } from "../types/types";
import classes from "../styles.module.css";
// import TodoItem from "../models/todoItem"
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { Box } from "@mui/system";

interface TodoFormProps {
  item?: Todo;
  addTodo?: AddTodo;
  updateTodo?: UpdateTodo;
  editMode?: boolean;
  closeDialog?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  item,
  addTodo,
  updateTodo,
  editMode,
  closeDialog,
}) => {
  // const classes = useStyles();

  const [todo, setTodo] = useState<Todo>(
    item
      ? { ...item }
      : {
          // id: item? item.id : "", id:
          id: "",
          task: "",
          isCompleted: false,
          deadline: "",
          startTime: "",
          endTime: "",
        }
  );

  const [taskError, setTaskError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let taskErrorMessage = "";
    let endTimeErrorMessage = "";

    if (!todo.task) {
      taskErrorMessage = "This field is required";
    }

    if (todo.task && todo.task.length < 3) {
      taskErrorMessage = "Must enter at least 3 characters";
    }

    if (todo.deadline && todo.startTime && todo.startTime >= todo.endTime) {
      endTimeErrorMessage =
        "The ending time must be greater than the starting time";
    }

    if (taskErrorMessage || endTimeErrorMessage) {
      setTaskError(taskErrorMessage);
      setEndTimeError(endTimeErrorMessage);
      return false;
    }

    return true;
  };

  const handleCloseDialog = () => {
    if (closeDialog !== undefined) {
      closeDialog();
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const isValid = validate();
    if (editMode === false) {
      if (isValid) {
        if (todo && todo.task && addTodo !== undefined) {
          addTodo({
            id: todo.id,
            task: todo.task,
            deadline: todo.deadline,
            isCompleted: todo.isCompleted,
            startTime: todo.startTime,
            endTime: todo.endTime,
          });

          setTodo({
            id: todo.id,
            task: "",
            isCompleted: false,
            deadline: "",
            startTime: "",
            endTime: "",
          });
          setTaskError("");
          setEndTimeError("");
        }
      }
    } else {
      if (isValid) {
        if (updateTodo !== undefined) {
          updateTodo(todo);
          setTodo(todo);
          handleCloseDialog();
        }
      }
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        className={classes.formContainer}
        autoComplete="off"
      >
        <h1 className={classes.title}>
          {editMode ? "Edit Todo" : "Add New Todo"}
        </h1>

        <TextField
          onChange={handleInputsChange}
          type="text"
          name="task"
          value={todo.task}
          className={classes.inputField}
          label="Task"
          variant="outlined"
          fullWidth
          placeholder="Task placeholder"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.errorMsg}>{taskError}</div>

        <TextField
          onChange={handleInputsChange}
          type="date"
          name="deadline"
          value={todo.deadline}
          className={classes.inputField}
          label="Deadline"
          variant="outlined"
          color="primary"
          fullWidth
          disabled={!todo.task}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box className={classes.boxContainer}>
          <TextField
            onChange={handleInputsChange}
            type="time"
            name="startTime"
            value={todo.startTime}
            className={`${classes.inputField} ${classes.timeField}`}
            label="Start Time"
            variant="outlined"
            color="primary"
            disabled={!todo.deadline}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            onChange={handleInputsChange}
            type="time"
            name="endTime"
            value={todo.endTime}
            className={`${classes.inputField} ${classes.timeField}`}
            label="End Time"
            variant="outlined"
            color="primary"
            disabled={!todo.startTime}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <div className={classes.errorMsg}>{endTimeError}</div>
        <div className={classes.buttonsContainer}>
          <Button type="submit" variant="contained" className={classes.btn}>
            {editMode ? "Save" : "Add todo"}
          </Button>

          {editMode ? (
            <Button
              onClick={handleCloseDialog}
              type="submit"
              className={classes.btnClose}
              variant="contained"
            >
              Close
            </Button>
          ) : null}
        </div>
      </form>
    </React.Fragment>
  );
};

export default TodoForm;
