import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArtistCard from "./Card";
import SongList from "./List";

const fetchWithToken = async (url, token) => {
  const res = await fetch(url, { headers: { Authorization: token } });
  const json = await res.json();
  return json;
};

export default function Index() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currentPlay, setCurrentPlay] = useState(-1);

  useEffect(() => {
    if (window.location.hash === "") return;

    const token = window.location.hash.substring(1).split("=")[1];
    const tokenFromHash = "Bearer " + token;

    const getDataFromSpotify = async type => {
      const setState = {
        artists: setArtists,
        tracks: setTracks,
      };

      const { items } = await fetchWithToken(
        `https://api.spotify.com/v1/me/top/${type}`,
        tokenFromHash
      );

      setState[type](items);
    };

    const endpoints = ["artists", "tracks"];
    endpoints.forEach(endpoint => getDataFromSpotify(endpoint));

    setToken(tokenFromHash);
  }, []);

  return (
    <Container>
      <ArtistListWrapper>
        <ul>
          {artists.map(({ name, images, popularity }, idx) => (
            <ArtistCard
              key={idx}
              name={name}
              src={images[0].url}
              popularity={popularity}
            />
          ))}
        </ul>
      </ArtistListWrapper>
      <SongListWrapper>
        <SongList
          tracks={tracks}
          token={token}
          currentPlay={currentPlay}
          setCurrentPlay={setCurrentPlay}
        />
      </SongListWrapper>
      <BottomPlayer>
        {!!tracks.length && currentPlay !== -1 && (
          <SongInfo track={tracks[currentPlay]} />
        )}
      </BottomPlayer>
    </Container>
  );
}

const SongInfo = ({ track }) => {
  const { artists, name, album, track_number } = track;
  return (
    <span>
      {artists[0].name} - {name} [{album.name} / {track_number}번 트랙] (
      {album.album_type})
    </span>
  );
};

const Container = styled.div`
  display: flex;
`;

const ArtistListWrapper = styled.div`
  position: relative;
  width: 55%;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    position: sticky;
    top: 30px;
  }
`;

const SongListWrapper = styled.ul`
  width: 45%;
`;

const BottomPlayer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.85);

  text-align: center;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;
