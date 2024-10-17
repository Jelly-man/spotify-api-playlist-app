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
        className="bg-gray-700 text-white p-2 rounded mb-4 w-full"
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
            <li key={track.id} className="flex justify-between mb-2 mr-1">
              <p>{track.name}</p>
              <button onClick={() => onDeleteTrack(track.id, selectedPlaylist)}>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 1024 1024"
                  fill="#ffffff"
                  class="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                    fill=""
                  />
                  <path
                    d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                    fill=""
                  />
                  <path d="M328 340.8l32-31.2 348 348-32 32z" fill="" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
