import React from "react";

const Playlist = ({ playlist, onPlaylistClicked, isSelected, ...props }) => {
  return (
    <div {...props} onClick={onPlaylistClicked}>
      <img src={playlist.images[0].url} />
      <div className="playlistInfo">
        <h3>{playlist.name}</h3>
        {isSelected && (
          <>
            {playlist.description && <p>{playlist.description}</p>}
            <p>
              Crée par{" "}
              <a target="_blank" href={playlist.owner.external_urls.spotify}>
                {playlist.owner.display_name}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Playlist;
