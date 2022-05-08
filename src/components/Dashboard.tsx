import React, { useState, useEffect, useContext } from "react";
import TodoList from "./TodoList";
import constants from "../models/constants";
import { TodosContext } from "../context/TodosContext";
import { Todo } from "../types/types";

const Dashboard: React.FC = () => {
  // const { todos }: any = useContext(TodosContext);
  const { todos }: any = useContext(TodosContext);

  const [todosAnytime, setTodosAnytime] = useState<Todo[]>([]);
  const [todosToday, setTodosToday] = useState<Todo[]>([]);

  useEffect(() => {
    getTodoAnytimeList();
    getDoToday();
  }, [todos]);

  function getTodoAnytimeList() {
    
      setTodosAnytime(
        todos.filter((todo: Todo) => todo.deadline === constants.anytime)
      );
    
    
  }

  function getDoToday() {
    todos.filter((todo: Todo) => todo.deadline === constants.anytime);

    let date = new Date().toJSON().slice(0, 10);
    let newTodoList = todos
      .filter((todo: Todo) => todo.deadline === date)
      .sort(function (todo: Todo, nextTodo: Todo) {
        if (todo.startTime > nextTodo.startTime) return 1;
        if (todo.startTime < nextTodo.startTime) return -1;

        return 0;
      })

    setTodosToday(newTodoList);
  }

  return (
    <div>
      <TodoList todos={todosToday} title="Do Today" showHeader={false} />

      <TodoList todos={todosAnytime} title="Do Anytime" showHeader={false} />
    </div>
  );
};

export default Dashboard;
