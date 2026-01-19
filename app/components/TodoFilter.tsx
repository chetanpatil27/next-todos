import { useCallback } from "react";

type FilterType = "all" | "active" | "completed";

type TodoFilterProps = {
  currentFilter: FilterType;
};

export default function TodoFilter({ currentFilter }: TodoFilterProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];
  const onFilterChange = useCallback((filter: FilterType) => {
    window.location.hash = `#${filter}`;
  }, []);

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1 rounded ${
            currentFilter === filter.value
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          } transition-colors cursor-progress`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
