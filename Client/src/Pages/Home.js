import React, { PureComponent } from "react";
import { URL } from "../serverUrl";
import Video  from '../Components/Video.js/Video'
export class Home extends PureComponent {
  componentDidMount() {
    fetch(`${URL}api/video`, {
      method: "get",
    })
      .then((res) => res.json()).then((res) => this.setState({ video: res }));
  }
  state = {
    video:[],
  };
  render() {
    const { video } = this.state;
    return <div>
      <h2 style={{margin:"50px 0px 20px 30px",letterSpacing:"1px",color:"#29303b"}}>Latest Video</h2>
       {video.length !==0 ? (<Video video={video}/>):null}
       <h2 style={{margin:"50px 0px 20px 30px",letterSpacing:"1px",color:"#29303b"}}>Today's Top Videos</h2>
       {video.length !==0 ? (<Video video={video}/>):null}
       <h2 style={{margin:"50px 0px 20px 30px",letterSpacing:"1px",color:"#29303b"}}>Last weak Top Videos</h2>
       {video.length !==0 ? (<Video video={video}/>):null}
       <h2 style={{margin:"50px 0px 20px 30px",letterSpacing:"1px",color:"#29303b"}}>All Time Popular Video</h2>
       {video.length !==0 ? (<Video video={video}/>):null}
    </div>;
  }
}

export default Home;
