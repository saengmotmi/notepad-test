import React from "react";
import Child from "./Child";

class Parent extends React.Component {
  constructor() {
    super();
    console.log("부모 constructor");
  }

  componentDidMount() {
    console.log("부모 CDM");
  }

  render() {
    console.log("부모 Render");

    return (
      <div>
        <Child />
        <Child />
        <Child />
      </div>
    );
  }
}

export default Parent;
