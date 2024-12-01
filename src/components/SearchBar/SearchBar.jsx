export default function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="block w-full p-2 border border-gray-300"
      />
    );
  }
  