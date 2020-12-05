import React, { PureComponent } from "react";
import Logo from "../../Images/logo.png";
import { IconWrap } from "../../Styled";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { VscAdd, VscBellDot, VscAccount } from "react-icons/vsc";

export default class Navigation extends PureComponent {
  state = {
    navOpen: false,
    AccOpen:false,
  };
  navOpenCall = () => {
    this.setState({ navOpen: !this.state.navOpen,AccOpen:false });
  };
  AccOpenCall = () => {
    this.setState({ AccOpen: !this.state.AccOpen,navOpen:false });
  };
  CloseCall = () => {
    this.setState({navOpen: false,AccOpen:false});
  };
  render() {
    const { navOpen, AccOpen } = this.state;
    const NavStyle = navOpen ? null : { display: "none" };
    const AccStyle = AccOpen ? null : { display: "none" };
    return (
      <div className="navigation">
        <Link onClick={this.navCloseCall} to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <div style={{ marginTop: "17px" }} onClick={this.CloseCall}>
          <Search />
        </div>
        <nav style={{ margin: "18px 0px", overflow: "hidden" }}>
          <IconWrap onClick={this.CloseCall} to="/upload">
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
          <p className="NotificationMessage">Account details</p>
        </div>
      </div>
    );
  }
}
