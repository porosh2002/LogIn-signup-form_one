import React, { PureComponent } from "react";
import Logo from "../../Images/logo.png";
import { IconWrap } from "../../Styled";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import {setAccountMenu} from '../../Redux/AccountMenu/actions'
import {AccountMenu} from '../../Redux/AccountMenu/acc_selector'
import { VscAdd, VscBellDot, VscAccount } from "react-icons/vsc";
import { connect } from "react-redux";
 class Navigation extends PureComponent {
  state = {
    navOpen: false,
    AccOpen:null,
  };
  componentDidUpdate() {
    if(this.state.navOpen !== this.props.account_menu){
      this.setState({AccOpen:this.props.account_menu})
    }
  }
  navOpenCall = () => {
    this.setState({ navOpen: !this.state.navOpen,AccOpen:false });
  };
  AccOpenCall = () => {
    this.props.setAccountMenu(!this.props.account_menu);
  };
  CloseCall = () => {
    this.setState({navOpen: false,AccOpen:false});
  };
  CloseCallTrue = () => {
    const{navOpen,AccOpen} = this.state;
    if(navOpen){
      this.setState({navOpen: false});
    }
    if(AccOpen){
      this.setState({AccOpen: false});
    }
  };
  render() {
    const { navOpen, AccOpen } = this.state;
    const NavStyle = navOpen ? null : { display: "none" };
    const AccStyle = AccOpen ? null : { display: "none" };
    return (
      <div onClick={this.CloseCallTrue} className="navigation">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
          <Search />
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
const mapStateToProps = (state) => {
  return {
    account_menu: AccountMenu(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setAccountMenu: (status) => dispatch(setAccountMenu(status)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
