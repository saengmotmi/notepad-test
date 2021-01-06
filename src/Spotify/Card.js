import React from "react";
import { Card } from "antd";

export default function ArtistCard({ name, src, popularity }) {
  return (
    <Card
      hoverable
      style={{ width: 135 }}
      cover={<img alt="example" src={src} />}
    >
      <Card.Meta title={name} description={"popularity: " + popularity} />
    </Card>
  );
}
