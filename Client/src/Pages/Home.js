import React, { Component } from "react";
import { URL } from "../serverUrl";
import Video from '../Components/Video.js/Video'
import Video2 from '../Components/Video.js/VideoMostView'
import Video3 from '../Components/Video.js/LatestVideo'
export class Home extends Component {
  componentDidMount() {
    fetch(`${URL}api/video`, {
      method: "get",
    })
      .then((res) => res.json()).then((res) => this.setState({ video: res }));
  }
  state = {
    video: [],
  };
  render() {
    const { video } = this.state;
    return <div>
      <h2 style={{ margin: "50px 0px 20px 30px", letterSpacing: "1px", color: "#29303b" }}>Latest Video</h2>
      {video.length !== 0 ? (<Video3 video={video} />) : null}
      <h2 style={{ margin: "50px 0px 20px 30px", letterSpacing: "1px", color: "#29303b" }}>Most viewed videos</h2>
      {video.length !== 0 ? (<Video2 video={video} />) : null}
      <h2 style={{ margin: "50px 0px 20px 30px", letterSpacing: "1px", color: "#29303b" }}>All Videos</h2>
      {video.length !== 0 ? (<Video video={video} />) : null}
    </div>;
  }
}

export default Home;
