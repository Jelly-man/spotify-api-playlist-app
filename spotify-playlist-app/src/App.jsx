import { useState } from "react";
import "./App.css";
import { SearchBar, SideBar, TrackList, SearchResults } from "./components";

function App() {
  return (
    <div>
      <SearchBar />
      <div className="flex h-screen">
        <SideBar />
        <TrackList />
        <SearchResults />
      </div>
    </div>
  );
}

export default App;
