import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const boxes = [150, 200, 130, 130, 180, 200, 250, 170, 170];

export default function Index() {
  const masonRef = useRef([]);
  const [spanArr, setSpanArr] = useState([]);

  useEffect(() => {
    setSpanArr(masonRef.current.map(box => box.clientHeight));
  }, []);

  return (
    <List>
      {boxes.map((box, idx) => {
        return (
          <Box key={box + idx} span={spanArr[idx]}>
            <p
              style={{ height: box + "px", background: "red" }}
              ref={ref => (masonRef.current[idx] = ref)}
            />
          </Box>
        );
      })}
    </List>
  );
}

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 11px;

  p {
    width: 250px;
  }
`;

const Box = styled.div`
  grid-row-end: ${({ span }) => `span ${Math.ceil(span ? span / 10 : 0)}`};
`;
