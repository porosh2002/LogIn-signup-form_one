import React, { PureComponent } from "react";
import { URL } from "../serverUrl";
import Video  from '../Components/Video.js/Video'
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
       {video.length !==0 ? (<Video video={video}/>):null}
    </div>;
  }
}

export default Home;
