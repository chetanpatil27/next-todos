import { TodoServices } from "@/services/query/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoItem({ id, title, completed }: TodoItemProps) {
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation({
    mutationKey: ["changeStatus"],
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      TodoServices.changeStatus(id, completed),
    onSuccess: (response) => {
      queryClient.setQueryData(
        ["todos"],
        (
          oldData:
            | { data: Array<{ id: number; title: string; completed: boolean }> }
            | undefined
        ) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((todo) =>
              todo.id === response.data.id ? response.data : todo
            ),
          };
        }
      );
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (id: number) => TodoServices.deleteTodo(id),
    onSuccess: (_response, deletedId) => {
      queryClient.setQueryData(
        ["todos"],
        (
          oldData:
            | { data: Array<{ id: number; title: string; completed: boolean }> }
            | undefined
        ) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((todo) => todo.id !== deletedId),
          };
        }
      );
    },
  });

  const changeStatus = () => {
    changeStatusMutation.mutate({ id, completed: !completed });
  };

  const deleteTodo = () => {
    deleteMutation.mutate(id);
  };

  const isLoading = changeStatusMutation.isPending || deleteMutation.isPending;

  return (
    <div
      className={`flex items-center gap-3 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors group ${
        isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={changeStatus}
        disabled={isLoading}
        className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span
        className={`flex-1 text-lg ${
          completed
            ? "line-through text-zinc-400 dark:text-zinc-500"
            : "text-zinc-800 dark:text-zinc-200"
        } transition-all`}
      >
        {title}
      </span>
      <button
        onClick={deleteTodo}
        disabled={isLoading}
        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all disabled:cursor-not-allowed"
        aria-label="Delete todo"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
