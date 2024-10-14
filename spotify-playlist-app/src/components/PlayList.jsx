import React from "react";
import { useState } from "react";

const PlayList = () => {
  const [userPlayList, setUserPlayList] = useState([
    "My Playlist 1",
    "My Playlist 2",
  ]);

  return (
    <div>
      <h1 className="text-xl font-mono font-bold">Saved PlayLists</h1>
      <ul>
        {userPlayList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayList;
