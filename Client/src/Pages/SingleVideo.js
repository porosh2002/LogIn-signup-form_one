import React, { PureComponent } from "react";
import { URL } from "../serverUrl";
export class Home extends PureComponent {
  componentDidMount() {
    fetch(`${URL}api/video/${this.props.match.params.id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => this.setState({ video: res[0]}));
  }
  state = {
    video:[],
  };
  render() {
      const {Title,Des,filePath} = this.state.video;
    return<div>
    <video style={{ width: '100%' }} src={`http://localhost:9000/${filePath}`} controls></video>
    </div>;
  }
}

export default Home;
