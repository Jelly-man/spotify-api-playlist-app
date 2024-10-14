import React from "react";
import PlayList from "./PlayList";
import TrackList from "./TrackList";

const SideBar = () => {
  return (
    <div className="w-1/4 bg-gray-200 p4">
      <PlayList />
      <TrackList />
    </div>
  );
};

export default SideBar;
