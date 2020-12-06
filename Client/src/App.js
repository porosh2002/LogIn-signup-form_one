import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./Footer";
import { connect } from "react-redux";
import Navigation from "./Components/Navigation/Navigation";
import { selectCurrentUser } from "./Redux/user/user_selector";
const Home = React.lazy(() => import("./Pages/Home"));
const Error = React.lazy(() => import("./Pages/Error"));
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Upload = React.lazy(() => import("./Pages/Upload"));
class App extends Component {
closenavigationmenu=()=>{
  
}
  render() {
    // !!!!!!!!!!
    const { userID } = this.props;
    // !!!!!!!!!!

    return (
      <div>
        <Navigation />
        <Suspense fallback={<p>Loading...</p>}>
            <div onClick={()=>{console.log('clicked')}}>
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
export default connect(mapStateToProps, null)(App);
