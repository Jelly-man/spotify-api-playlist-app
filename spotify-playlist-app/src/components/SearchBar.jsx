const SearchBar = ({ userName, onSearch, onLogout }) => {
  return (
    <div className="bg-[#282c34] min-h-screen p-4">
      {/* Top Search Bar */}
      <div className="flex items-center justify-between mb-4">
        {/* Search Input and Submit Button */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-80 rounded-md bg-[#121212] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button
            className="bg-[#1DB954] text-white py-2 px-4 rounded-md hover:bg-[#1ed760] transition"
            onClick={() => alert("Search submitted")}
          >
            Submit
          </button>
        </div>

        {/* Profile Section on the Right */}
        <div className="flex items-center space-x-4">
          {/* Profile SVG */}
          <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-10 h-10"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <p className="text-white text-xl">{userName}</p>
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
