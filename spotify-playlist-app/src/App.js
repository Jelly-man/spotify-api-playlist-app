import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [token, setToken] = useState("");

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

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleSearch = (query) => {
    console.log(query);
  };

  return (
    <div className="App">
      <header
        className={
          !token
            ? "bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]"
            : ""
        }
      >
        {!token ? (
          <Login />
        ) : (
          <div>
            <SearchBar
              userName="John Doe"
              onSearch={handleSearch}
              onLogout={handleLogout}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
