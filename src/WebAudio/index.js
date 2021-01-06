import React, { useState, useEffect, useRef } from "react";

export default function Index() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();

    const source = audioCtx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount; // 시각화를 하기 위한 데이터의 갯수
    const dataArray = new Uint8Array(bufferLength); // 데이터를 담을 bufferLength 크기의 Unit8Array의 배열을 생성

    console.log(dataArray);

    let drawVisual;

    setInterval(() => {
      analyser.getByteFrequencyData(dataArray);
      console.log(dataArray);

      const canvasCtx = canvasRef.current.getContext("2d");
      const WIDTH = canvasRef.current.width;
      const HEIGHT = canvasRef.current.height;

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      const draw = function () {
        canvasCtx.fillStyle = "white";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i];

          canvasCtx.fillStyle = "rgb(0,0,0)";
          canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight / 2);

          x += barWidth + 1;
        }
      };

      drawVisual = requestAnimationFrame(draw);

      draw();
    }, 25);
  });

  return (
    <div>
      <canvas ref={canvasRef} />
      <audio controls src="http://localhost:3000/achoo.mp3" ref={audioRef} />
    </div>
  );
}
