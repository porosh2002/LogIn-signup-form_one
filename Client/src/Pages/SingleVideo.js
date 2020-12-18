import React, { PureComponent } from "react";
import { URL } from "../serverUrl";
import poster from "../Images/poster.jpg";
import { connect } from "react-redux";
import { selectCurrentUser } from "../Redux/user/user_selector";
import { ImHeart} from "react-icons/im";
import { AiFillApi} from "react-icons/ai";
class Home extends PureComponent {
  componentDidMount() {
    fetch(`${URL}api/video/${this.props.match.params.id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          video: res[0],
          Likes: res[0].Likes,
          DisLikes: res[0].UnLike,
        })
    ).then(() => {
      fetch(`${URL}api/activity/${this.state.video._id}`, {
        method: "get",
      }).then(res => res.json()).then(res => {
        if (res !== undefined) {
          this.setState({liked:res.Liked,Unliked:res.UnLiked})
        }
      })
      })
      .then(() =>
        setTimeout(() => {
          fetch(`${URL}api/viewsUpdate/${this.state.video._id}`, {
            method: "post",
          });
        }, 15000)
      );
  }
  state = {
    video: [],
    Likes: null,
    DisLikes: null,
    liked:false,
    Unliked:false
  };
  LikeAdded = () => {
    const { userID } = this.props;
    fetch(`${URL}api/LikeUpdate/${this.state.video._id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID:userID
      }),
    })
    .then((res) => res.json())
      .then((res) => this.setState({ Likes: res })).then(() => {
        fetch(`${URL}api/activity/${this.state.video._id}`, {
          method: "get",
        }).then(res => res.json()).then(res => {
          if (res !== undefined) {
            this.setState({liked:res.Liked})
          }
        })
    })
  };
  UnlikeAdded = () => {
    const { userID } = this.props;
    fetch(`${URL}api/UNLikeUpdate/${this.state.video._id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID
        }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ DisLikes: res })).then(() => {
        fetch(`${URL}api/activity/${this.state.video._id}`, {
          method: "get",
        }).then(res => res.json()).then(res => {
          if (res !== undefined) {
            this.setState({Unliked:res.UnLiked})
          }
        })
    })
  };
  render() {
    const {
      Title,
      Des,
      filePath,
      UploaderName,
      UploadDetails,
      Views,
    } = this.state.video;
    const { Likes, DisLikes, liked, Unliked } = this.state;
    const styleLiked = liked ? ({backgroundColor:"#ff4500",color:"#f7f7f7"}) :null
    const styleUNLiked = Unliked ? ({backgroundColor:"#ff4500",color:"#f7f7f7"}) :null
    return (
      <div>
        <div className="videoPlayer">
          <video
            poster={poster}
            style={{ width: "100%" }}
            src={`${URL}${filePath}`}
            controls 
          ></video>
          <div className="videoDetails">
            <p>{UploadDetails}</p>
            <p>Video uploaded by : {UploaderName}</p>
          </div>
          <div style={{ display: "flex" }}>
            <svg
              style={{
                margin: "3px 10px 0px 20px",
                height: "20px",
                color: "#317c34",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>

            <p style={{ fontWeight: "600", color: "#317c34" }}>{Views}</p>
          </div>
          <p className="videoTitle">{Title}</p>
          <p className="videoDes">{Des}</p>
          <div style={{ height: "30px" }}></div>
          <div className="UpDownVote">
            <div style={styleLiked} onClick={this.LikeAdded}>
              <p style={{ fontSize: "15px", marginRight: "10px" }}>{Likes}</p>
              <ImHeart />
            </div>
            <div style={styleUNLiked} onClick={this.UnlikeAdded}>
              <p style={{ fontSize: "15px", marginRight: "10px" }}>
                {DisLikes}
              </p>
              <AiFillApi />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userID: selectCurrentUser(state),
  };
};
export default connect(mapStateToProps,null)(Home);
