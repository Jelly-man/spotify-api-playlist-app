import React from "react";

const SearchResults = ({ results, onAddToPlaylist, selectedPlaylist }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {results.map((result) => (
        <div
          key={result.trackId}
          className="bg-white p-4 rounded-lg shadow-md h-60 w-full flex flex-col justify-between relative group"
        >
          {/* Image, track name, and artist */}
          <img
            src={result.albumImage}
            alt={result.trackName}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h3 className="text-md font-semibold line-clamp-2">
            {result.trackName}
          </h3>
          <p className="text-sm text-grey-600">{result.artistName}</p>

          {/* Hover Tooltip */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Click to add to selected playlist
          </div>

          {/* Clickable button area */}
          <button
            onClick={() => onAddToPlaylist(result, selectedPlaylist)}
            className="absolute inset-0 z-10"
            aria-label={`Add ${result.trackName} to playlist`}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
