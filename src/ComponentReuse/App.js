import React, { Component } from "react";
import InputComponent from "./InputComponent";

export default class App extends Component {
  state = {
    email: "",
    password: "",
    passwordCheck: "",
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, passwordCheck } = this.state;
    const validFunction = {
      email: (input) => input?.includes("@" && ".com"),
      password: (input) => input.length >= 8 && password === passwordCheck,
    };

    return (
      <>
        <InputComponent
          name="email"
          text="이메일"
          value={email}
          handleInput={this.handleInput}
          handleValid={validFunction.email}
        />
        <InputComponent
          name="password"
          text="비밀번호"
          password
          value={password}
          handleInput={this.handleInput}
          handleValid={validFunction.password}
        />
        <InputComponent
          name="passwordCheck"
          text="비밀번호 확인"
          password
          value={passwordCheck}
          handleInput={this.handleInput}
          handleValid={validFunction.password}
        />
      </>
    );
  }
}
