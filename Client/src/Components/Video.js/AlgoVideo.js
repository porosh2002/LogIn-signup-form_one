/* eslint-disable */
import React, { PureComponent } from 'react'
import VideoThumb from "./videoThumb";
import { connect } from 'react-redux';
import selectVideo from '../../Redux/VideoData/video_selector'
 class AlgoVideo extends PureComponent {
   render() {
     const {id,video} = this.props
      return (
        <div>
          {video.map((data, i) => {
                if (data._id !== id) {
                    return <VideoThumb VideoData={data} key={i} />;
                }
            })}
          </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    video:selectVideo(state),
  };
};
export default connect(mapStateToProps,null)(AlgoVideo)
