import { useCallback } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  isLoading?: boolean;
};

export default function TodoList({ todos, isLoading = false }: TodoListProps) {
  const filter = (
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : ""
  ) as "all" | "active" | "completed" | "";

  const getEmptyMessage = useCallback(() => {
    switch (filter) {
      case "completed":
        return "No completed tasks yet";
      case "active":
        return "No active tasks";
      default:
        return "No tasks yet. Add one above!";
    }
  }, [filter]);

  if (todos.length === 0) {
    return (
      <div className="p-12 text-center text-zinc-400 dark:text-zinc-500">
        <svg
          className="w-16 h-16 mx-auto mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-lg">{getEmptyMessage()}</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="p-12 text-center text-zinc-400 dark:text-zinc-500">
        <p className="text-lg">Loading tasks...</p>
      </div>
    );
  }
  return (
    <div className="divide-y divide-zinc-200 dark:divide-zinc-700 max-h-80 overflow-y-auto">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}
