import React from "react";
import "./App.css";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import SearchResults from "./components/SearchResults";

function App() {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Fetch playlists after login
    const getPlaylists = async () => {
      if (token) {
        const userPlaylists = await fetchPlaylists(token);
        setPlaylists(userPlaylists);
      }
    };
    getPlaylists();
  }, [token]);

  const fetchPlaylists = async (token) => {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data.items; // Return the playlists
  };

  const fetchPlaylistTracks = async (playlistId, token) => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data.items.map((item) => item.track); // Return the tracks
  };

  const handleDeleteTrack = async (trackId, selectedPlaylistId) => {
    // Find the selected playlist from the playlists array
    const selectedPlaylist = playlists.find(
      (playlist) => playlist.id === selectedPlaylistId
    );

    // Handle case where selected playlist is not found
    if (!selectedPlaylist) {
      console.error("Selected playlist not found");
      return;
    }

    // Extract the snapshot_id from the selected playlist
    const snapshotId = selectedPlaylist.snapshot_id;

    try {
      // Make DELETE request to remove track from playlist
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your valid token
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tracks: [
              {
                uri: `spotify:track:${trackId}`, // Track URI format
              },
            ],
            snapshot_id: snapshotId, // Include the snapshot_id
          }),
        }
      );

      // Check if response is successful
      if (!response.ok) {
        throw new Error("Failed to delete track from playlist");
      }

      // Fetch updated playlist tracks after successful deletion
      const updatedPlaylistTracks = await fetchPlaylistTracks(
        selectedPlaylist.id,
        token
      );
      setTracks(updatedPlaylistTracks); // Update tracks in the UI
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  const handlePlaylistChange = async (playlistId) => {
    setSelectedPlaylist(playlistId);
    const playlistTracks = await fetchPlaylistTracks(playlistId, token);
    setTracks(playlistTracks);
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);

      console.log("Token set:", token); // Check if token is set
    }
  }, []);

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleSearch = async () => {
    if (!query) return;

    const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Update results with the search data
      setResults(data);
      console.log(results);
      // console.log(data); // For debugging purposes
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {!token ? (
        <Login
          onLogout={handleLogout}
          className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]"
        />
      ) : (
        <>
          {/* Search Bar */}
          <SearchBar
            userName="John Doe"
            onChange={handleInputChange}
            onSearch={handleSearch}
            onLogout={handleLogout}
          />

          {/* Main Container for Playlists and Songs */}
          <div className="flex flex-grow p-4 bg-[#ECDFCC]">
            {/* Sidebar for Playlist Dropdown and Songs */}
            <Sidebar
              playlists={playlists}
              onPlaylistChange={handlePlaylistChange}
              selectedPlaylist={selectedPlaylist}
              tracks={tracks} // Pass the tracks to Sidebar
              onDeleteTrack={handleDeleteTrack} // Pass the delete function
            />

            {/* Optionally, add a space for rendering search results on the right */}
            <div className="flex-grow ml-4">
              <SearchResults results={results} />
              {/* This div can be used for other content */}
              {/* Render search results cards here */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
