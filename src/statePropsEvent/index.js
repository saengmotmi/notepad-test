import React, { Component } from "react";
import Child from "./Child";

export default class Parent extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      pw: "",
      backgroundColor: "gray",
      isVisible: true,
    };
    console.log("constructor");
  }

  handleInput = (event) => {
    const isGolbang = this.state.id.includes("@");
    const isGilE = this.state.pw.length >= 5;
    this.setState({
      [event.target.name]: event.target.value,
      backgroundColor: isGolbang && isGilE ? "blue" : "gray",
    });
    console.log("setState");
  };

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    console.log("render");
    return (
      <>
        {this.state.isVisible && (
          <Child
            id={this.state.id}
            pw={this.state.pw}
            backgroundColor={this.state.backgroundColor}
            handleInput={this.handleInput}
            changeFoo={this.changeFoo}
          />
        )}
        <div
          onClick={() => this.setState({ isVisible: !this.state.isVisible })}
        >
          asdfasdfasdf
        </div>
        <div style={{ height: "200vh" }}>asdfsad</div>
      </>
    );
  }
}
