"use client";
import React from "react";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import { useQuery } from "@tanstack/react-query";
import { TodoServices } from "@/services/query/todos";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: TodoServices.getTodos,
  });

  return (
    <div className="flex min-h-screen items-start justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-12 px-4">
      <main className="w-full max-w-2xl">
        <TodoHeader />

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
          <TodoInput />

          <TodoList
            todos={(data?.data as Todo[]) ?? []}
            isLoading={isLoading}
          />

          <TodoFooter
            total={data?.data?.length}
            activeCount={
              data?.data.filter((todo: Todo) => !todo.completed).length || 0
            }
          />
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
