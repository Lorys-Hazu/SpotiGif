import React from "react";

const Track = (props) => {
  const track = props.track.track;
  if (!track.name) return
  const albumImg = track.album.images.find((i) => i.height === 64)?.url;
  return (
    <div className="track">
      <img src={albumImg} alt={`Cover de ${track.album.name}`} />
      <div className="trackInfo">
        <h4>{track.name}</h4>
        <p>{track.artists.map((a) => a.name).join(" x ")}</p>
      </div>
    </div>
  );
};

export default Track;
