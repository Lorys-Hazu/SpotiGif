import { useEffect } from "react";
import React from "react";

const Login = ({setToken}) => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        
        if (!token && hash) {
            token = hash.substring(1).split("&").find(el => el.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", token)
            let expirationDate = new Date(Date.now())
            expirationDate.setHours(expirationDate.getHours() + 1)
            window.localStorage.setItem("expireAt", expirationDate);
            setToken(token)
        }
    }, [])
    return (<div className="loginContainer">
        <h1>Bienvenue sur Spotigif !</h1>
        <div>
        Connecte toi à Spotify
        </div>
        <a className="btn" href={loginUrl}>Connexion</a>
    </div>);
};

export default Login;
