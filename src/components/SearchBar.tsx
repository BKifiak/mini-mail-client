type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="bg-slate-100 p-5">
      <input
        type="text"
        placeholder="Suche nach Betreff oder Absender..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-5 py-3 bg-white border-2 border-slate-100 focus:outline-none focus:border-green-400"
      />
    </div>
  );
}
