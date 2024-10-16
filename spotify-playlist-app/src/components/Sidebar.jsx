const Sidebar = ({
  playlists,
  onPlaylistChange,
  selectedPlaylist,
  tracks,
  onDeleteTrack,
}) => {
  return (
    <div className="bg-gray-800 text-white w-1/4 p-4 h-screen">
      <h2 className="text-lg font-bold">Playlists</h2>
      <select
        className="bg-gray-700 text-white p-2 rounded mb-4"
        onChange={(e) => onPlaylistChange(e.target.value)}
        value={selectedPlaylist}
      >
        <option value="">Select a Playlist</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>

      {/* Songs Display Area */}
      <h3 className="text-lg font-bold mb-2">Songs</h3>
      <div className="overflow-y-auto" style={{ maxHeight: "80%" }}>
        {" "}
        {/* Fixed height with overflow */}
        <ul>
          {tracks.map((track) => (
            <li key={track.id} className="flex justify-between mb-2">
              <p>{track.name}</p>
              <button
                className="text-red-500"
                onClick={() => onDeleteTrack(track.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
