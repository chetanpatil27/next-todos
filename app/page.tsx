"use client";

import { useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type FilterType = "all" | "active" | "completed";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex min-h-screen items-start justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-12 px-4">
      <main className="w-full max-w-2xl">
        <TodoHeader />

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
          <TodoInput
            value={inputValue}
            onChange={setInputValue}
            onAdd={addTodo}
          />

          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {todos.length > 0 && (
            <TodoFooter
              activeCount={activeCount}
              currentFilter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <div className="text-center mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            Click on a task to mark it complete • Press Enter to add quickly
          </p>
        </div>
      </main>
    </div>
  );
}
