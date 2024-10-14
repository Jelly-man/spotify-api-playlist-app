import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex-1 overflow-y-auto max-h-screen p-4">SearchResults</div>
  );
};

export default SearchResults;
