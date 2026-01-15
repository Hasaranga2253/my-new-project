function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchBar;
