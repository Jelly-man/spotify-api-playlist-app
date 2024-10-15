import { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import Playlists from "./components/Playlists";
import axios from "axios";

function App() {
  const CLIENT_ID = "eb82c29294d44011b47fb33caf36a1d6";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [serchKey, setSearchKey] = useState("");

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
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = (e) => {
    const {data} = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: serchKey,
        type: "artist",
      },
    });
    console.log(data);
  };
      }


  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#1DB954",
            fontSize: "70px",
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          Spotify playlist app
        </h1>

        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {token ? (
          <form onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}
      </div>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#1DB954" }}>Playlists</h2>
          <Playlists token={token} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#1DB954" }}>Songs</h2>
          <SearchResults token={token} />
        </div>
      </div>
    </div>
  );
}

export default App;
