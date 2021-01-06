import React, { useState, useEffect, useRef } from "react";
import { List, Space, Avatar } from "antd";
import { StarOutlined } from "@ant-design/icons";
import PreviewSong from "./Components/PreviewSong";

export default function SongList({
  tracks,
  token,
  currentPlay,
  setCurrentPlay,
}) {
  const [profiles, setProfiles] = useState([]);
  const videoRef = useRef([]);

  useEffect(() => {
    (async () => {
      if (!tracks.length) return;

      const filteredIds = tracks.map(track => track.artists[0].id);
      const promiseArr = filteredIds.map(id =>
        fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: token },
        })
      );
      const res = await Promise.all(promiseArr);
      const jsonPromises = res.map(j => j.json());
      const json = await Promise.all(jsonPromises);

      const profilesUrls = json.map(item => item.images[0].url);
      setProfiles(profilesUrls);
    })();
  }, [token, tracks]);

  const scrollIntoView = e => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={tracks}
      renderItem={(item, idx) => (
        <List.Item
          key={item.name}
          actions={[
            <IconText
              Icon={StarOutlined}
              text={item.popularity}
              key="list-vertical-star-o"
            />,
          ]}
          extra={
            <PreviewSong
              item={item}
              idx={idx}
              element={videoRef.current}
              currentPlay={currentPlay}
              setCurrentPlay={setCurrentPlay}
            />
          }
          onClick={scrollIntoView}
        >
          <List.Item.Meta
            avatar={<Avatar src={profiles[idx]} />}
            title={<a href={item.href}>{item.name}</a>}
            description={item.description}
          />
          <audio
            name="media"
            controls
            volume="0"
            data-idx={idx}
            style={{ width: "0px", height: "0px" }}
            src={item.preview_url}
            ref={ref => {
              videoRef.current[idx] = ref;
              if (videoRef.current[idx]) {
                videoRef.current[idx].volume = 0;
              }
            }}
          />
          아티스트 : {item.album.artists[0].name}
          <br />
          앨범명 : {item.album.name}
          <br />
          트랙 번호 : {item.track_number}
          <br />
          앨범 타입 : {item.album.album_type}
          <br />
        </List.Item>
      )}
    />
  );
}

const IconText = ({ Icon, text }) => (
  <Space>
    <Icon />
    {text}
  </Space>
);
