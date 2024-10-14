import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-gray-100 p-2 shadow-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-80 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
