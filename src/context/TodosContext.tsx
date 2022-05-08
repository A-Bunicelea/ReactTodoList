import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import constants from "../models/constants";
import {
  AddTodo,
  RemoveTodo,
  ToggleComplete,
  Todo,
  UpdateTodo,
  TodosContextInterface,
} from "../types/types";
import useLocalStorage from "../components/useLocalStorage";

// export const TodosContext = createContext<null|TodosContextInterface>(null);
export const TodosContext = createContext<TodosContextInterface>({
  todos: [],
  removeTodo: () => {},
  updateTodo: () => {},
  toggleComplete: () => {},
  addTodo: () => {},
});

const TodosContextProvider: React.FC = ({ children }) => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useLocalStorage("todoList", []);

  const addTodo: AddTodo = (newTodo) => {
    if (newTodo) {
      newTodo.id = uuidv4();
      newTodo.deadline = newTodo.deadline || constants.anytime;
      setTodos([...todos, newTodo]);
      console.log("ADD", newTodo)
    }
  };

  const removeTodo: RemoveTodo = (selectedTodo) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== selectedTodo.id));
  };

  const toggleComplete: ToggleComplete = (selectedTodo) => {
    const newTodos = todos.map((todo: any) => {
      if (todo.id === selectedTodo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const updateTodo: UpdateTodo = (todoItem) => {
    const originalTodoItem: Todo | undefined = todos.find(
      (item: any) => item.id === todoItem.id
    );
    if (originalTodoItem) {
      // originalTodoItem.id = todoItem.id;
      originalTodoItem.task = todoItem.task;
      originalTodoItem.deadline = todoItem.deadline;
      originalTodoItem.startTime = todoItem.startTime;
      originalTodoItem.endTime = todoItem.endTime;
    }
    console.log(todos);

    //dam un alt array ca sa poata sa vada ca s-a facut o schimbare
    setTodos([...todos]);
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, removeTodo, toggleComplete, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
