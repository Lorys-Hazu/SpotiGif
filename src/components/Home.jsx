import React, { useEffect, useState } from "react";
import axios from "axios";
import Playlist from "./Playlist";
import Track from "./Track";
import GifCanva from "./GifCanva";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const baseUrl = "https://api.spotify.com/v1/";
  const token = window.localStorage.getItem("token");
  const getPlaylists = async (url = baseUrl + "me/playlists", prev = null) => {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.next) {
      getPlaylists(data.next, prev ? [...prev, ...data.items] : data.items);
      return;
    }
    setPlaylists([...prev, ...data.items]);
  };

  const onPlaylistClicked = async (playlist) => {
    setSelectedPlaylist(playlist);
    getSongsFromPlaylist(playlist);
  };

  const getSongsFromPlaylist = async (playlist) => {
    const { data } = await axios.get(playlist.tracks.href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPlaylistTracks(data.items);
  };

  const onReturnTapped = () => {
    setSelectedPlaylist(null)
    setPlaylistTracks([])
}

  if (playlists.length === 0) {
    getPlaylists();
  }

  return (
    <>
      {!selectedPlaylist && (
        <>
        <div className="header">
          <h1>Choisis ton Spotigif !</h1>
          <p>
            Selectionne la playlist que tu veux tranformer en gif à partager
          </p>
        </div>
          <div className="feedContainer">
            {playlists.map((playlist) => (
              <Playlist
                isSelected={false}
                key={playlist.snapshot_id}
                className="playlist__home"
                playlist={playlist}
                onPlaylistClicked={() => onPlaylistClicked(playlist)}
              />
            ))}
          </div>
        </>
      )}
      {selectedPlaylist && (
        <div className="detailContainer">
            <div className="header">
          <h1>Voici ton Spotigif !</h1>
          </div>
          <div className="returnBtn" onClick={onReturnTapped}>
            Go to playlists
          </div>
          <Playlist
            isSelected={true}
            playlist={selectedPlaylist}
            className="playlist__selected"
          />
          {playlistTracks.length && (
            <GifCanva
              playlistTracks={playlistTracks}
              playlist={selectedPlaylist}
            />
          )}
          {!playlistTracks.length && <p>Loading...</p>}
          {playlistTracks.length && <h3>Tous les titres</h3>}
          {playlistTracks?.map((pt) => (
            <Track key={pt.track.id} track={pt} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
