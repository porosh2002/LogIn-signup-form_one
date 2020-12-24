import React, { Component } from "react";
import {connect} from 'react-redux'
import selectVideo from '../Redux/VideoData/video_selector'
import Video from '../Components/Video.js/Video'
import Video2 from '../Components/Video.js/VideoMostView'
import Video3 from '../Components/Video.js/LatestVideo'
class Home extends Component {
  render() {
    const { video } = this.props;
    return <div>
      <h2 style={{ margin: "50px 0px 20px 30px", letterSpacing: "1px", color: "#29303b" }}>Latest Video</h2>
      {video.length !== 0 ? (<Video3 video={video} />) : null}
      <h2 style={{ margin: "50px 0px 20px 30px", letterSpacing: "1px", color: "#29303b" }}>Trending</h2>
      {video.length !== 0 ? (<Video2 video={video} />) : null}
      <h2 style={{ margin: "50px 0px 20px 30px", letterSpacing: "1px", color: "#29303b" }}>All Videos</h2>
      {video.length !== 0 ? (<Video video={video} />) : null}
    </div>;
  }
}
const mapStateToProps = (state) => {
  return {
    video:selectVideo(state),
  };
};
export default connect(mapStateToProps,null)(Home)