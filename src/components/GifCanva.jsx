import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import {createGIF} from "gifshot-plus"

const GifCanva = ({ playlistTracks, playlist }) => {
  const [gif, setGif] = useState(null);
  const allImagesLink = playlistTracks.map((pt) => {
    const avImg = pt.track.album.images;
    const goodImg = avImg.find((img) => img.height === 640);
    if (!avImg.length && !goodImg) return;
    console.log(avImg);
    if (!goodImg) {
      return {
        src: avImg[0].url,
        text: `${pt.track.name}<br/>${pt.track.artists
          .map((a) => a.name)
          .join(" x ")}`,
      };
    }
    return {
      src: goodImg.url,
      text: `${pt.track.name}<br/>${pt.track.artists
        .map((a) => a.name)
        .join(" x ")}`,
    };
  });
  createGIF(
    {
      images: allImagesLink.filter(Boolean),
      gifWidth: 640,
      gifHeight: 640,
      numFrames: allImagesLink.length + 1,
      frameDuration: 1,
      sampleInterval: 10,
      textBaseline: "bottom",
      fontSize: "32px",
      fontWeight: "bold",
      resizeFont: true,
    },
    function (obj) {
      if (!obj.error) {
        const image = obj.image;
        setGif(image);
      }
    }
  );
  const text = `Petit concept les reufs:\n\n1. Mettez pause quand vous voulez sur ce gif\n2. Écoutez le morceau en question\n\nEn plus, vous pourriez découvrir des trucs que vous kiffez\n\nLien vers la playlist: ${
    playlist.external_urls.spotify
  }\n\nLien pour créer ton gif: ${import.meta.env.VITE_REDIRECT_URI}\nPS: Pense à mettre le gif ;)`;

  return (
    <div className="gifContainer">
      <h3>{`Le Spotigif de ${playlist.name}`}</h3>
      {gif ? (
        <>
          <img src={gif} className="gif" />
          <div className="linkContainer">
            <a className="btn" download={`gif--${playlist.name}`} href={gif}>
              Télécharger
            </a>
            <a
              className="btn"
              href={`https://twitter.com/intent/tweet?text=${encodeURI(text)}`}
              target="_blank"
            >
              Tweet
            </a>
          </div>
        </>
      ) : (
        <div className="loading">
          <h4>Ton gif est en chargement...</h4>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default GifCanva;
