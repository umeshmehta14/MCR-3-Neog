import React from "react";
import { useData } from "../Contexts/DataContext";
import "./SearchBar.css";

const SearchBar = () => {
  const { handleSearch } = useData();
  return (
    <div className="search-box">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
