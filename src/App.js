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
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [snapshotId, setSnapshotId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch playlists after login
    const getPlaylists = async () => {
      if (token) {
        const userPlaylists = await fetchPlaylists(token);
        setPlaylists(userPlaylists);
      }
    };
    getPlaylists();
    const getUserName = async () => {
      if (token) {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserName(data.display_name);
      }
    };
    getUserName();
  }, [token]);

  const fetchPlaylists = async (token) => {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(data);
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
    // console.log(data);
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
    const snapshot = selectedPlaylist.snapshot_id;
    setSnapshotId(snapshot);

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

  const handleAddToPlaylist = async (result, selectedPlaylist) => {
    if (!selectedPlaylist) {
      console.error("No selected playlist");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [`spotify:track:${result.trackId}`], // Ensure the format is correct
          }),
        }
      );

      if (response.ok) {
        console.log("Track added to playlist");
        const updatedPlaylist = await fetchPlaylistTracks(
          selectedPlaylist,
          token
        );
        const selectedPlaylistData = playlists.find(
          (playlist) => playlist.id === selectedPlaylist
        );
        if (selectedPlaylistData) {
          setSnapshotId(selectedPlaylistData.snapshot_id); // Update the snapshot_id
        }
        setTracks(updatedPlaylist);

        // Optionally, you can fetch the updated playlist tracks
      } else {
        console.error("Failed to add track to playlist");
      }
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
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

    setSearchResults([]);

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

      const processedResults = data.tracks.items.map((item) => ({
        trackId: item.id,
        trackName: item.name,
        artistName: item.artists[0].name, // Use [0] to get the first artist's name
        albumImage: item.album.images[0].url, // Use the first image URL
      }));

      setSearchResults(processedResults);
      console.log(searchResults);
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
            userName={userName}
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
              <SearchResults
                results={searchResults}
                onAddToPlaylist={handleAddToPlaylist}
                selectedPlaylist={selectedPlaylist}
              />
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
