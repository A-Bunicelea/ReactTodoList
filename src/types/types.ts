export interface Todo {
  id: string;
  task: string;
  isCompleted: boolean;
  deadline: string;
  startTime: string;
  endTime: string;
}

export interface TodosContextInterface {
  todos: Todo[];
  addTodo: AddTodo;
  removeTodo: RemoveTodo;
  toggleComplete: ToggleComplete;
  updateTodo: UpdateTodo;
}

export type AddTodo = (newTodo: Todo) => void;

export type ToggleComplete = (selectedTodo: Todo) => void;

export type RemoveTodo = (selectedTodo: Todo) => void;

export type UpdateTodo = (selectedTodo: Todo) => void;
