import React from "react";
import styled from "styled-components";
import { usePreviewSongContext } from "./PreviewSong";

export default function PlayBtn({ diameter }) {
  const { idx, currentPlay, setCurrentPlay, element } = usePreviewSongContext();
  const isSameIdx = idx === currentPlay;

  const handlePlaying = () => {
    if (currentPlay === -1) {
      element[idx].play();
      setCurrentPlay(idx);
      return;
    }

    if (isSameIdx) {
      element[idx].pause();
      setCurrentPlay(-1);
      return;
    }

    if (!isSameIdx) {
      element[currentPlay].pause();
      element[idx].play();
      setCurrentPlay(idx);
      return;
    }
  };

  return (
    <Btn diameter={diameter} onClick={handlePlaying}>
      <svg
        height="30"
        role="img"
        width="30"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isSameIdx ? (
          <>
            <rect x="5" y="3" width="4" height="18" fill="white" />
            <rect x="15" y="3" width="4" height="18" fill="white" />
          </>
        ) : (
          <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="white" />
        )}
      </svg>
    </Btn>
  );
}

export const Btn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  background: #1db954;
  border-radius: 50%;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
`;
