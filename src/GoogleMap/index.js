import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAP_API = "AIzaSyAFa9sLIWmafGcucNdDcOEAc1ZxdAzo2pU";

export default function Index() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    let map;
    const loader = new Loader({
      apiKey: GOOGLE_MAP_API,
      version: "weekly",
    });
    loader.load().then(() => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}
