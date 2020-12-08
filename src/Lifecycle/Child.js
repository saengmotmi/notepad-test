// 자식.js
import React from "react";

class Child extends React.Component {
  constructor() {
    super();
    console.log("자식 constructor");
  }

  componentDidMount() {
    console.log("자식 CDM");
  }

  render() {
    console.log("자식 Render");

    return <span>자식 컴포넌트</span>;
  }
}

export default Child;
