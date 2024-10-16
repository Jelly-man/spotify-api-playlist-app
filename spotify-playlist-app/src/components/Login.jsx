import React from "react";

const Login = () => {
  const CLIENT_ID = "eb82c29294d44011b47fb33caf36a1d6";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="flex flex-col items-center">
      <svg
        className="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 168 168"
        fill="none"
      >
        <circle cx="84" cy="84" r="84" fill="#1DB954" />
        <path
          fill="#fff"
          d="M122.78 111.467c-1.78 2.952-5.567 4.033-8.684 2.322-23.723-13.765-53.598-16.853-88.067-8.864-3.384.771-6.752-1.336-7.527-4.667-.774-3.33 1.344-6.71 4.728-7.484 36.951-8.68 69.568-5.23 95.484 10.154 3.118 1.81 4.243 5.509 2.066 8.539zm10.975-20.72c-2.232 3.709-6.98 5.042-10.882 2.876-27.174-15.771-68.708-20.31-100.63-10.673-4.052 1.213-8.45-.946-9.652-5.057-1.202-4.12.946-8.482 5.003-9.684 35.55-10.383 81.544-5.308 112.436 12.105 3.9 2.273 5.325 7.184 3.724 11.434zm2.343-23.512c-30.907-17.837-82.038-19.431-111.14-10.197-4.734 1.465-9.795-1.296-11.268-6.02-1.473-4.723 1.296-9.76 6.03-11.233 33.256-10.316 89.748-8.451 124.866 12.162 4.399 2.54 5.903 8.195 3.383 12.597-2.54 4.398-8.186 5.896-12.597 3.391z"
        />
      </svg>

      <h1 className="text-4xl font-bold text-green-500">
        Spotify Playlist Creator
      </h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login
      </a>
    </div>
  );
};

export default Login;
