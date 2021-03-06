import React, { Component } from "react";
import { Button, Input } from "../Styled";
import { URL } from "../serverUrl";
import validator from "validator";
import { connect } from "react-redux";
import { setUser } from "../Redux/user/actions";
import SuccessMessage from '../Components/Success/successMessage'
import Error from "../Components/Error/Error";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorHappend: false,
      LoginSuccess:false
    };
  }
  InputValue = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  SubmitValue = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      if (validator.isEmail(email) === true && password.length > 5) {
        this.setState({ passmatch: false });
        fetch(`${URL}api/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((res) => {
              this.props.setUserID(res);
              this.setState({ LoginSuccess: true })
              const Redirect = () => {
                this.props.history.push('/')
                this.setState({ LoginSuccess:false})
              }
              setTimeout(function () {
                Redirect()
              },1000);
            });
          } else {
            this.setState({ errorHappend: true });
          }
        });
      }
    } catch {
      this.setState({ errorHappend: true });
    }
  };
  closeErrorDialog = () => {
    this.setState({ errorHappend: false });
  };
  render() {
    const { errorHappend, LoginSuccess } = this.state;
    const styleError = errorHappend ? null : { display: "none" };
    const styleSuccess = LoginSuccess ? null : { display: "none" };
    return (
      <div style={{ textAlign: "center", margin: "50px 0px" }}>
        <div style={styleSuccess}>
          <SuccessMessage message0={" Login "}
            message1={"Successful"}></SuccessMessage>
        </div>
        <div style={styleError}>
          <Error
            onClick={this.closeErrorDialog}
            message0={" you submitted "}
            message1={" incorrect information "}
          />
        </div>
        <p className="title title-b">Login</p>
        <form onSubmit={this.SubmitValue}>
          <Input
            onChange={this.InputValue}
            required
            name={"email"}
            placeholder={"Enter Your valid email"}
            type="email"
            autoFocus
            maxLength="32"
          />
          <Input
            onChange={this.InputValue}
            required
            name={"password"}
            placeholder={"Enter your Password"}
            type="password"
            minLength="6"
            maxLength="32"
          />
          <Button type="submit" value="Login" />
        </form>
        <Link className='LinkToAccount' to='/signup'>create account</Link>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUserID: (user) => dispatch(setUser(user)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
