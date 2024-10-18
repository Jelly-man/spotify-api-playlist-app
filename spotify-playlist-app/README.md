# Spotify Playlist Manager

This project is a React web application that integrates with the Spotify API to allow users to search for tracks, manage playlists, and perform operations like adding and deleting tracks.

## Features

- **Login with Spotify:** Authenticate with your Spotify account using an access token.
- **Search for Songs:** Search for tracks on Spotify using the search bar.
- **Manage Playlists:** View your Spotify playlists in a sidebar, and select one to view its tracks.
- **Add/Remove Tracks:** Add tracks to your selected playlist or remove tracks from it.
- **Responsive Design:** The layout adjusts for different screen sizes.

## Components

### 1. **Login**

- Handles Spotify authentication via OAuth.
- Redirects the user to the login page if they are not authenticated.

### 2. **SearchBar**

- Allows the user to search for tracks via the Spotify API.
- Displays the current logged-in user's Spotify username.
- Contains a logout button to clear the token and log out.

### 3. **Sidebar**

- Displays the user's playlists and their tracks.
- Allows the user to switch between playlists and view their contents.
- Provides the option to delete tracks from a selected playlist.

### 4. **SearchResults**

- Displays search results in a list with track name, artist, and album image.
- Allows the user to add a track to the selected playlist.

## Installation

To run this project locally, follow the steps below:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/spotify-playlist-manager.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd spotify-playlist-manager
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   You will need to register an app with Spotify to get a client ID and redirect URI. Create a `.env` file in the root directory and add the following:

   ```bash
   REACT_APP_SPOTIFY_CLIENT_ID=your-client-id
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
   ```

5. **Start the development server:**

   ```bash
   npm start
   ```

6. **Login to Spotify:**

   The app will redirect you to Spotify’s login page. Once logged in, you can start using the app.

## Usage

1. **Login**: On the homepage, log in using your Spotify account. The app will store your access token in local storage.
2. **Search for Tracks**: Use the search bar at the top of the page to find tracks on Spotify.
3. **Manage Playlists**: View your playlists in the sidebar and select one to manage.
4. **Add/Delete Tracks**: Add a track to your selected playlist or remove a track from it.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Spotify Web API**: For fetching user data, playlists, tracks, and performing playlist modifications.
- **Tailwind CSS**: For responsive and modern UI design.
- **JavaScript**: Core logic for handling state and API interactions.

## Future Enhancements

- **Track Preview**: Add the ability to preview a song before adding it to a playlist.
- **Playlist Creation**: Allow users to create new playlists directly from the app.
- **Error Handling**: Improve error handling for failed API requests.

## License

This project is licensed under the MIT License.
