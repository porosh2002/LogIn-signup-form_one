import React, { PureComponent } from "react";
import { URL } from "../serverUrl";
import poster from '../Images/poster.jpg'
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
    <div className='videoPlayer'>
    <video poster={poster} style={{ width: '100%' }} src={`${URL}${filePath}`} controls></video>
    <p className='videoTitle'>{Title}</p>
    <p className='videoDes'>{Des}</p>
    </div>
    </div>;
  }
}

export default Home;
