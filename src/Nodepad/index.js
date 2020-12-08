import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
  useEffect(() => {
    getCoin();
  }, []);

  // const getCoin = async () => {
  //   const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  //   const json = await res.json();
  //   console.log(json);
  // };

  const getCoin = async () => {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    console.log(res);
    console.log("asdfasdfads");
  };

  return <div></div>;
}
