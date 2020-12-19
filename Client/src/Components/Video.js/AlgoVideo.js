// // 5fde2b9eff4d4802c4e2618e
// import React from "react";
// export default function Video() {

//     return (
//         <div>
//             {ModifiedDataLatest.map((data, i) => {
//                 return <VideoThumb VideoData={data} key={i} />;
//             })}
//         </div>
//     );
// }
import React, { PureComponent } from 'react'
import {URL} from '../../serverUrl'
import VideoThumb from "./videoThumb";
export default class AlgoVideo extends PureComponent {
    componentDidMount() {
        fetch(`${URL}api/video`, {
          method: "get",
        })
            .then((res) => res.json()).then((res) => this.setState({ video: res })).then(() => {
          })
      }
      state = {
        video: [],
      };
    render() {
        const { id } = this.props;
        return (
            <div>
            {this.state.video.map((data, i) => {
                if (data._id !== id) {
                    return <VideoThumb VideoData={data} key={i} />;
                }
            })}
            </div>
        )
    }
}
