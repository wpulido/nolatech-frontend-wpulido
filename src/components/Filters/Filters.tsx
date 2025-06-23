type FilterProps = {
  authors: string[];
  statuses: string[];
  selectedAuthor: string;
  selectedStatus: string;
  onFilterChange: (author: string, status: string) => void;
};

export function Filters({ authors, statuses, selectedAuthor, selectedStatus, onFilterChange }: FilterProps) {
  return (
    <>
      <div className="flex w-full md:w-auto gap-4">
        <select value={selectedAuthor} onChange={(e) => onFilterChange(e.target.value, selectedStatus)} className="border w-full p-2 rounded">
          <option value="">Todos los autores</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>

        <select value={selectedStatus} onChange={(e) => onFilterChange(selectedAuthor, e.target.value)} className="border w-full p-2 rounded">
          <option value="">Todos los estados</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
