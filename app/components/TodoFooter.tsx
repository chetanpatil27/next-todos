import TodoFilter from "./TodoFilter";

type FilterType = "all" | "active" | "completed";

type TodoFooterProps = {
  activeCount: number;
  total?: number;
};

export default function TodoFooter({ activeCount, total }: TodoFooterProps) {
  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 flex flex-wrap items-center justify-between gap-4 text-sm">
      <div>
        <span className="text-zinc-600 dark:text-zinc-400">{total} total</span>
        &nbsp;•&nbsp;
        <span className="text-zinc-600 dark:text-zinc-400">
          {activeCount} {activeCount === 1 ? "item" : "items"} left
        </span>
      </div>

      <TodoFilter currentFilter={"all"} />

      <button
        // onClick={onClearCompleted}
        className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        Clear completed
      </button>
    </div>
  );
}
