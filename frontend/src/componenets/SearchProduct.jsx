import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ setProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5118/api/Product/search?searchQuery=${searchQuery}`
      );
      setProducts(response.data);
      setSearchQuery("") // Update the products list with the search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
