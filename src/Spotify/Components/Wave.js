import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { usePreviewSongContext } from "./PreviewSong";

const FFT_SIZE = 2048;

export default function Wave() {
  const canvasRef = useRef(null);
  const { element, idx } = usePreviewSongContext();

  useEffect(() => {
    let interval;
    let audio;

    (async () => {
      // audioCtx, analyser 세팅
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = FFT_SIZE; // FFT의 크기를 2048로 한다.
      const bufferLength = analyser.frequencyBinCount; // 시각화를 하기 위한 데이터의 갯수
      const dataArray = new Uint8Array(bufferLength); // 데이터를 담을 bufferLength 크기의 Unit8Array의 배열을 생성

      // data fetching
      const res = await fetch(element[idx].src);
      const blob = await res.blob();
      const blobURL = URL.createObjectURL(blob);

      // source 생성 및 연결
      audio = new Audio(blobURL);
      const source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      audio.play();

      interval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);

        const canvasCtx = canvasRef.current.getContext("2d");
        const WIDTH = canvasRef.current.width;
        const HEIGHT = canvasRef.current.height;
        const barWidth = (WIDTH / bufferLength) * 2.5;

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        const draw = function () {
          dataArray.reduce((acc, barHeight) => {
            canvasCtx.fillStyle = "rgb(255,255,255)";
            canvasCtx.fillRect(acc, HEIGHT, barWidth, -barHeight / 2);

            return acc + barWidth + 1;
          }, 0);
        };

        draw();
      }, 25);
    })();

    return () => {
      clearInterval(interval);
      audio.pause();
    };
  }, [element, idx]);

  return <WaveCanvas ref={canvasRef} />;
}

const WaveCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.75;
`;
