import React, { useEffect, useState } from "react";
import TaskContainer from "./TaskContainer";
import classes from "../styles.module.css";
import { Todo } from "../types/types";
import Box from "@mui/material/Box";

interface TodoListProps {
  todos: Todo[];
  title: string;
  showHeader?: boolean;
  leftTodo?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  title,
  showHeader,
  leftTodo,
}) => {
  const [groupedList, setGroupedList] = useState<Record<string, Todo[]>>({});

  const getGroupedList = () => {
    // let list = todos;
    let listGroups: Record<string, Todo[]> = {};

    todos.forEach((item: Todo) => {
      let group = listGroups[item.deadline];
      if (group) {
        group.push(item);
      } else {
        listGroups[item.deadline] = [item];
      }
    });

    setGroupedList(listGroups);
  };

  // console.log("groupedList", Array.isArray(groupedList));
  console.log("groupedlist top", groupedList);

  useEffect(() => {
    getGroupedList();
  }, [todos]);

  return (
    <div className={classes.listContainer}>
      <h2 className={classes.listContainerTitle}>{title}</h2>
      {showHeader ? (
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              p: 1,
              m: 1,
              mb: 0,
              pb: 0,
            }}
          >
            <Box className={classes.box} sx={{ p: 1, width: "5%" }}></Box>
            <Box
              className={classes.box}
              sx={{ p: 1, width: "25%", fontWeight: "500" }}
            >
              Task
            </Box>
            <Box
              className={classes.box}
              sx={{ p: 1, width: "20%", fontWeight: "500" }}
            >
              Deadline
            </Box>
            <Box
              className={classes.box}
              sx={{ p: 1, width: "10%", fontWeight: "500" }}
            >
              Start
            </Box>
            <Box
              className={classes.box}
              sx={{ p: 1, width: "10%", fontWeight: "500" }}
            >
              End
            </Box>
            <Box className={classes.box} sx={{ p: 1, width: "5%" }}></Box>
            <Box className={classes.box} sx={{ p: 1, width: "5%" }}></Box>
          </Box>
        </div>
      ) : null}
      {!leftTodo ? (
        <div>
          {todos.map((todo: Todo) => {
            return <TaskContainer key={todo.id} todo={todo} />;
          })}
        </div>
      ) : null}

      {/* DE AICI */}
      {leftTodo ? (
        <div>
          {Object.getOwnPropertyNames(groupedList).map((dateLabel: string) => {
            console.log("ITEM", typeof dateLabel);
            console.log("grouped list", groupedList);
            return (
              <div key={dateLabel}>
                {/* <div>{dateLabel}</div> */}
                <h2 className={classes.listContainerTitle} style={{textAlign:"left"}}>{dateLabel}</h2>
                {groupedList[dateLabel].map((group) => {
                  return (
                    <div>
                      {/* // <p>{group.task}</p> */}

                      <TaskContainer key={group.id} todo={group} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TodoList;
