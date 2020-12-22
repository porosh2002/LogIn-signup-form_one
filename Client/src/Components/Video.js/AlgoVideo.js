/* eslint-disable */
import React, { PureComponent } from 'react'
import {URL} from '../../serverUrl'
import VideoThumb from "./videoThumb";
import axios from 'axios'
export default class AlgoVideo extends PureComponent {
  constructor() {
    super()
    this.state = {
      video:[]
    }
  }
  componentDidMount() {
    axios.get(`${URL}api/video`).then(res =>this.setState({video:res.data}))
  }
    render() {
      const { id } = this.props;
      const notVoid = this.state.video !== [] ? (<div>
{this.state.video.map((data, i) => {
                if (data._id !== id) {
                    return <VideoThumb VideoData={data} key={i} />;
                }
            })}
      </div>):null
        return (
            <div>
              {notVoid}
            </div>
        )
    }
}
