function Filter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All Categories</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default Filter;
