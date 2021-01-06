import React, { createContext, useContext } from "react";
import styled from "styled-components";
import PlayBtn, { Btn } from "./PlayBtn";
import Wave from "./Wave";

const PreviewSongContext = createContext();
const { Provider } = PreviewSongContext;

export const usePreviewSongContext = () => useContext(PreviewSongContext);

export default function PreviewSong({ item, ...value }) {
  const { currentPlay, idx } = value;

  return (
    <Provider value={value}>
      <ImgWrapper>
        <Dimmer />
        {currentPlay === idx && <Wave />}
        <PlayBtn diameter={50} />
        <img alt="album logo" width={272} src={item.album.images[0].url} />
      </ImgWrapper>
    </Provider>
  );
}

const Dimmer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: black;
  opacity: 0;
`;

const ImgWrapper = styled.div`
  position: relative;

  &:hover {
    ${Dimmer} {
      opacity: 0.3;
    }

    ${Btn} {
      display: flex;
    }
  }
`;
