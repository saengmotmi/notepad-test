import React, { useState, useEffect } from "react";

export default function Index() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      console.log("count 1 :", count);
      setCount(count + 1);
      console.log("count 2 :", count);
      setCount(count + 1);
      console.log("count 3 :", count);
      setCount(count + 1);
      console.log("count 4 :", count);
    })();
  }, []);

  console.log("render", count);

  return <div></div>;
}
