import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

const APP_KEY = "4cbcbc2e9b2ca1cfca0760f5259bd304";
const divBtnOpt = {
  width: "50px",
  height: "50px",
  position: "fixed",
  top: "100px",
  zIndex: "10",
};

const App = () => {
  const [map, setMap] = useState(null);
  const [markerArr, setMarkerArr] = useState([]);
  const [locationArr, setLocationArr] = useState([]);

  const getLocation = async () => {
    const data = await fetch("/mapMarker.json");
    const dataJSON = await data.json();
    const arr = dataJSON.homes.map((el) => {
      return {
        home_region: el.home_region,
        home_latitude: el.home_latitude,
        home_longitutde: el.home_longitutde,
      };
    });

    setLocationArr(arr);
  };

  const createMap = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        };
        const createdMap = new kakao.maps.Map(container, options);
        setMap(createdMap);
      });
    };
  };

  const deleteMarker = () => markerArr.forEach((e) => e.setMap(null));

  useEffect(() => {
    getLocation(); // location 정보 fetch
    createMap();
  }, []);

  // marker 생성 + 표시
  useEffect(() => {
    if (map && locationArr.length) {
      const createMarker = () => {
        const { kakao } = window;
        const markers = locationArr.map((e) => {
          const position = new kakao.maps.LatLng(
            e.home_latitude,
            e.home_longitutde
          );

          const marker = new kakao.maps.Marker({
            map,
            position,
          });

          const ReactComponent = OverlayComponent();
          const content = ReactDOMServer.renderToString(ReactComponent);

          const overlay = new kakao.maps.CustomOverlay({
            position,
            content,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            console.log("click");
          });

          overlay.setMap(map);

          return marker;
        });

        setMarkerArr(markers);
      };

      console.log(map, locationArr);
      createMarker();
    }
  }, [map, locationArr]);

  return (
    <div className="App">
      <div
        // onClick={() => getLocation(2)}
        style={{ ...divBtnOpt, backgroundColor: "red", left: "100px" }}
      />
      <div
        onClick={deleteMarker}
        style={{ ...divBtnOpt, backgroundColor: "blue", left: "150px" }}
      />
      <div id="Mymap" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default App;

function OverlayComponent() {
  return (
    <div class="label">
      <span class="left"></span>
      <span class="center">위코드!!!!</span>
      <span class="right"></span>
    </div>
  );
}
