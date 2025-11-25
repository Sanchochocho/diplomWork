import { useState } from "react";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Поиск рецептов..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
};

export default Search;
