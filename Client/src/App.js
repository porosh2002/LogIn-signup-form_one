import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./Footer";
import { connect } from "react-redux";
import Navigation from "./Components/Navigation/Navigation";
import { selectCurrentUser } from "./Redux/user/user_selector";
import { setAccountMenu } from "./Redux/AccountMenu/actions";
import { setNotificationMenu } from "./Redux/NotificationMenu/actions";
const Home = React.lazy(() => import("./Pages/Home"));
const Error = React.lazy(() => import("./Pages/Error"));
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Upload = React.lazy(() => import("./Pages/Upload"));
class App extends Component {
closenavigationmenu=()=>{
  this.props.setAccountMenu(false)
  this.props.NotificationMenu(false);
}
  render() {
    const { userID } = this.props;
    return (
      <div>
        <Navigation />
        <Suspense fallback={<p>Loading...</p>}>
            <div onClick={this.closenavigationmenu}>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/login"
                render={() =>
                  userID === false ? <Login /> : <Redirect to="/" />
                }
              />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/upload" component={Upload} />
              <Route component={Error} />
          </Switch>
            </div>
        </Suspense>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userID: selectCurrentUser(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAccountMenu: (status) => dispatch(setAccountMenu(status)),
    NotificationMenu: (status) => dispatch(setNotificationMenu(status)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
