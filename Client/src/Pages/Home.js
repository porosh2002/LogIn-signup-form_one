import React, { PureComponent } from "react";
import { URL } from "../serverUrl";
export class Home extends PureComponent {
  componentDidMount() {
    fetch(`${URL}api/video`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => this.setState({ video: res }));
  }
  state = {
    video:[],
  };
  render() {
      const {video} = this.state;
    return <div>
       
    </div>;
  }
}

export default Home;
