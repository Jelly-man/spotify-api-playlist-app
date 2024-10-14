import React from "react";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <form className="bg-gray-100 p-4 shadow-md sticky top-0 z-10 flex">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e === "enter") {
            console.log(search);
          }
        }}
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={(e) => {
          e.preventDefault();
          console.log(search);
        }}
      >
        Search
      </button>
      <div className="flex flex-col items-center items-center">
        <button className="ml-2 p-2 border border-gray-300 rounded-md object-center rounded-full">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z"
              fill="#4A5699"
            />
            <path
              d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z"
              fill="#C45FA0"
            />
            <path
              d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z"
              fill="#E5594F"
            />
          </svg>
        </button>
        <p className="text-sm text-gray-500 pl-1.5">Login</p>
      </div>
    </form>
  );
};

export default SearchBar;
