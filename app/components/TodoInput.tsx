import React from "react";
import { TodoServices } from "@/services/query/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoInput() {
  const [value, setValue] = React.useState("");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: TodoServices.createTodo,
    onSuccess: (response) => {
      setValue("");
      queryClient.setQueryData(
        ["todos"],
        (oldData: { data: unknown[] } | undefined) => {
          if (!oldData) return oldData;
          const newData = { ...response.data, id: Date.now() };
          return {
            ...oldData,
            data: [...oldData.data, newData],
          };
        }
      );
    },
  });

  const onAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    mutate({ title: value, completed: false, userId: 1, id: Date.now() });
  };

  return (
    <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
      <form onSubmit={onAdd}>
        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
