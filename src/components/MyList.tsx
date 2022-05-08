import React, { useState, useEffect, useContext } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TodosContext } from "../context/TodosContext";
import { Todo } from "../types/types";
import classes from "../styles.module.css";
type SortList = (list: []) => [];

const MyList: React.FC = () => {
  const { todos }: any = useContext(TodosContext);
  const { addTodo }: any = useContext(TodosContext);
  //const {addTodo, todos} = useContext(TodosContext) as TodosContextInterface;
  //const addTodo = contextValue?.addTodo;?
  //onst todos = contextValue?.todos;
  console.log("TODOS", todos);

  const [overdueTodos, setOverdueTodos] = useState<Todo[]>([]);
  const [leftTodos, setLeftTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getOverdueTodos();
    getLeftTodoList();
  }, [todos]);

  const sortList: SortList = (list) => {
    list.sort((todo: Todo, nextTodo: Todo): any => {
      if (todo.deadline > nextTodo.deadline) return 1;
      if (todo.deadline < nextTodo.deadline) return -1;

      if (todo.deadline === nextTodo.deadline) {
        if (todo.startTime > nextTodo.startTime) {
          return 1;
        } else {
          return -1;
        }
      }
    });

    return list;
  };

  function getOverdueTodos() {
    let date = new Date().toJSON().slice(0, 10);
    let time = new Date().getHours() + ":" + new Date().getMinutes();
   
    let newTodoList = todos.filter((todo: Todo) => {
      if (todo.deadline < date) {
        return todo.deadline;
      } else if (todo.deadline === date) {
        if (todo.startTime < time) {
          return todo;
        } else {
          return false;
        }
      }
    });
    sortList(newTodoList).reverse();
    setOverdueTodos(newTodoList);
  }

  function getLeftTodoList() {
    let date = new Date().toJSON().slice(0, 10);
    let time = new Date().getHours() + ":" + new Date().getMinutes();

    let newTodoList = todos.filter((todo: Todo) => {
      if (todo.deadline > date) {
        return true;
      } else if (todo.deadline === date) {
        if (todo.startTime >= time) {
          return true;
        }
      } else {
        return false;
      }
    });
    sortList(newTodoList);
    setLeftTodos(newTodoList);
  }

  return (
    <div>
      <div className={classes.formBox}>
        <TodoForm addTodo={addTodo} editMode={false} />
      </div>
      <TodoList todos={overdueTodos} title="Overdue tasks" showHeader={false}/>
      {/* <TodoList todos={leftTodos} title="Left to do" showHeader={false} leftTodo={true}/> */}
      <TodoList
        todos={leftTodos}
        title="Left to do"
        showHeader={false}
        leftTodo={true}
      />
    </div>
  );
};

export default MyList;
