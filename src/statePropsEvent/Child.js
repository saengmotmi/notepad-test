import React, { Component } from "react";

export default class Child extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.consoooooolll);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("scroll", this.consoooooolll);
  }

  render() {
    const { handleInput, backgroundColor, changeFoo } = this.props;

    return (
      <>
        <input
          onClick={this.foo()}
          type="text"
          name="id"
          onChange={handleInput}
        />
        <input type="password" name="pw" onChange={handleInput} />
        <button style={{ background: backgroundColor }}>로그인 버튼!</button>
        <button onClick={() => changeFoo(this.state.foo)}>fooooooo</button>
      </>
    );
  }
}
