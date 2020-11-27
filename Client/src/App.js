import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
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
  render() {

    // !!!!!!!!!! 
    const { userID } = this.props;
    console.log(userID);
    // !!!!!!!!!! 

    return (
      <div>
        <Navigation />
<Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/upload" component={Upload} />
            <Route component={Error} />
          </Switch>
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
