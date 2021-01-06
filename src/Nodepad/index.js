import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default class Index extends React.Component {
  state = {
    isToggle: false,
  };

  handleToggle = () => {
    this.setState(prev => ({ isToggle: !prev.isToggle }));
  };

  render() {
    return (
      <Wrapper>
        {this.state.isToggle ? "올라왔네" : "내려갔네"}
        <div
          className="a"
          onMouseEnter={this.handleToggle}
          onMouseLeave={this.handleToggle}
        >
          a
        </div>
        <div className="d">d</div>
        <div
          onMouseEnter={this.handleToggle}
          onMouseLeave={this.handleToggle}
          className="b"
        >
          b
        </div>
        <div className="c">c</div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  div {
    width: 100px;
    height: 100px;

    &.a,
    &.b {
      &:hover {
        opacity: 0.5;
      }
    }
  }

  .a {
    background-color: red;
  }

  .b {
    background-color: green;
  }

  .c {
    background-color: yellow;
  }

  .d {
    background-color: orange;
  }
`;
