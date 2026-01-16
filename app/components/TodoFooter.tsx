import TodoFilter from "./TodoFilter";

type FilterType = "all" | "active" | "completed";

type TodoFooterProps = {
  activeCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
};

export default function TodoFooter({
  activeCount,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 flex flex-wrap items-center justify-between gap-4 text-sm">
      <span className="text-zinc-600 dark:text-zinc-400">
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>

      <TodoFilter
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />

      <button
        onClick={onClearCompleted}
        className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        Clear completed
      </button>
    </div>
  );
}
