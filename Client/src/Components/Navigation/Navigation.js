import React, { PureComponent } from "react";
import Logo from "../../Images/logo.png";
import { IconWrap } from "../../Styled";
import { URL } from "../../serverUrl";
import Search from "../Search/Search";
import { Link, withRouter } from "react-router-dom";
import { setUser } from "../../Redux/user/actions";
import { selectCurrentUser } from "../../Redux/user/user_selector";
import { AccountMenu } from "../../Redux/AccountMenu/acc_selector";
import { setAccountMenu } from "../../Redux/AccountMenu/actions";
import { setNotificationMenu } from "../../Redux/NotificationMenu/actions";
import SuccessMessage from "../Success/SuccessLogout";
import { NotificationMenu } from "../../Redux/NotificationMenu/nof_selector";
import { VscAdd, VscBellDot, VscAccount } from "react-icons/vsc";
import { connect } from "react-redux";
class Navigation extends PureComponent {
  state = {
    navOpen: this.props.notification_menu,
    AccOpen: this.props.account_menu,
    name: null,
    LoginSuccess: false,
  };
  componentDidMount() {
    const { userID } = this.props;
    if (userID !== undefined) {
      fetch(`${URL}api/getname`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userID,
        }),
      })
        .then((res) => res.json())
        .then((newRes) => this.setState({ name: newRes }));
    }
  }

  componentDidUpdate() {
    if (this.props.notification_menu !== this.state.notification_menu) {
      this.setState({ navOpen: this.props.notification_menu });
    }
    if (this.props.account_menu !== this.state.AccOpen) {
      this.setState({ AccOpen: this.props.account_menu });
    }
  }
  navOpenCall = () => {
    this.props.NotificationMenu(!this.state.navOpen);
  };
  AccOpenCall = () => {
    this.props.setAccountMenu(!this.state.AccOpen);
  };
  LogmeOut = () => {
    this.props.setUserID(undefined);
    this.setState({ LoginSuccess: true });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  };
  CloseCall = () => {
    this.setState({ navOpen: false, AccOpen: false });
  };
  CloseCallError = () => {
    this.setState({ LoginSuccess: false });
  };
  CloseCallTrue = () => {
    const { navOpen, AccOpen } = this.state;
    if (navOpen) {
      this.props.NotificationMenu(!this.state.navOpen);
    }
    if (AccOpen) {
      this.props.setAccountMenu(!this.state.AccOpen);
    }
  };
  render() {
    const { navOpen, AccOpen, LoginSuccess } = this.state;
    const { userID } = this.props;
    const NavStyle = navOpen ? null : { display: "none" };
    const AccStyle = AccOpen ? null : { display: "none" };
    const styleSuccess = LoginSuccess ? null : { display: "none" };
    return (
      <div onClick={this.CloseCallTrue} className="navigation">
        <div style={styleSuccess}>
          <SuccessMessage
            onClick={this.CloseCallError}
            message0={" Logout "}
            message1={"Successful"}
          ></SuccessMessage>
        </div>

        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <Search />
        <nav style={{ margin: "18px 0px", overflow: "hidden" }}>
          <IconWrap onClick={this.CloseCall} to="/upload/test">
            <VscAdd />
          </IconWrap>
          <IconWrap onClick={this.navOpenCall} to="#">
            <VscBellDot />
          </IconWrap>
          <IconWrap onClick={this.AccOpenCall} to="#">
            <VscAccount />
          </IconWrap>
        </nav>
        <div style={NavStyle} className="NotificationDiv">
          <p className="NotificationMessage">no navigation</p>
        </div>
        <div style={AccStyle} className="NotificationDiv">
          <div
            style={{ width: "90%", textAlign: "center" }}
            className="NotificationMessage"
          >
            {userID !== undefined ? (
              <div>
                <p style={{ fontSize: "18px" }}>{this.state.name}</p>
                <p style={{ marginBottom: "10px" }}>{userID}</p>
                <div>
                  <Link
                    onClick={this.LogmeOut}
                    className="accountMenuBtn"
                    to="/"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <Link className="accountMenuBtn" to="/login">
                  Login now
                </Link>
                <Link className="accountMenuBtn" to="/signup">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userID: selectCurrentUser(state),
    account_menu: AccountMenu(state),
    notification_menu: NotificationMenu(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAccountMenu: (status) => dispatch(setAccountMenu(status)),
    NotificationMenu: (status) => dispatch(setNotificationMenu(status)),
    setUserID: (user) => dispatch(setUser(user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));
