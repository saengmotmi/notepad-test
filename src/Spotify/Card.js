import React from "react";
import styled from "styled-components";
import { Card } from "antd";

export default function ArtistCard({ name, src, popularity }) {
  return (
    <S.Card hoverable cover={<img alt="example" src={src} />}>
      <Card.Meta title={name} description={"popularity: " + popularity} />
    </S.Card>
  );
}

const S = {
  Card: styled(Card)`
    width: 135px;
  `,
};
