import { useState, useRef, useEffect } from "react";
import "./Search.css";

const Search = ({ onSearch, onFilterSelect, categories }) => {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  const handleSelect = (cat, e) => {
    e.stopPropagation();
    setSelectedCategory(cat.id);
    setDropdownOpen(true);
    if (onFilterSelect) onFilterSelect(cat.id);
  };

  return (
    <div className="search-line">
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск рецептов..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="search-button">🔍</button>
      </form>

      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button className="filter-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {categories.find(c => c.id === selectedCategory)?.name || "Все рецепты"} ▼
        </button>

        {dropdownOpen && (
          <div className="filter-dropdown">
            <div className="filter-scroll">
              <div className="filter-item" onClick={(e)=>handleSelect({id:"all", name:"Все"}, e)}>Все</div>
              {categories.map(cat => (
                <div className="filter-item" key={cat.id} onClick={(e)=>handleSelect(cat, e)}>
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
