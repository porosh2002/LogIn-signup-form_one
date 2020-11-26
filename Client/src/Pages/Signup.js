import React, { Component } from "react";
import { Button, Input } from "../Styled";
import { URL } from "../serverUrl";
import validator from "validator";
import Error from "../Components/Error/Error";
export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      repassword: "",
      passmatch: false,
      errorHappend: false,
    };
  }
  InputValue = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if ([name].toString() === "repassword") {
      this.setState({ passmatch: false });
    }
  };
  closeErrorDialog = () => {
    this.setState({ errorHappend: false });
  };
  SubmitValue = (event) => {
    const { name, email, password, repassword } = this.state;
    event.preventDefault();
    try {
      if (name.length > 1 && validator.isEmail(email) === true) {
        if (password !== repassword) {
          this.setState({ passmatch: true });
        } else if (password === repassword) {
          this.setState({ passmatch: false });
          fetch(`${URL}api/register`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }).then((res) => {
            if (res.status === 200) {
              //! account Created Successfully
            } else {
              this.setState({ errorHappend: true });
            }
          });
        }
      }
    } catch {
      this.setState({ errorHappend: true });
    }
  };
  render() {
    const { passmatch, errorHappend } = this.state;
    const stylePassMatch = passmatch
      ? { border: "1px solid red", backgroundColor: " #fed8b1" }
      : null;
    const styleError = errorHappend ? null : { display: "none" };
    const stylePassMessage = passmatch ? null : { display: "none" };
    return (
      <div>
        <div style={styleError}>
          <Error
            onClick={this.closeErrorDialog}
            message0={" something went "}
            message1={" wrong "}
          />
        </div>
        <p className="title title-b">Signup</p>
        <form onSubmit={this.SubmitValue}>
          <Input
            autoFocus
            onChange={this.InputValue}
            required
            name={"name"}
            placeholder={"Enter Your name"}
            type="text"
            maxLength="16"
          />
          <Input
            onChange={this.InputValue}
            required
            name={"email"}
            placeholder={"Enter Your valid email"}
            type="email"
            maxLength="32"
          />
          <Input
            onChange={this.InputValue}
            required
            name={"password"}
            placeholder={"Enter new Password"}
            type="password"
            minLength="6"
            maxLength="32"
          />
          <Input
            style={stylePassMatch}
            onChange={this.InputValue}
            required
            name={"repassword"}
            placeholder={"re-type your new password"}
            type="password"
            minLength="6"
            maxLength="32"
          />
          <div style={stylePassMessage}>
            <div
              className="color-oranged"
              style={{
                width: "300px",
                display: "block",
                margin: "0px auto",
                fontSize: "14px",
              }}
            >
              <p>Password doesn't match</p>
            </div>
          </div>
          <Button type="submit" value="Signup" />
        </form>
      </div>
    );
  }
}
