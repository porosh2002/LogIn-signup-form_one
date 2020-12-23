
import React, { Component } from 'react'
import {URL} from '../../serverUrl'
export class Thumbnail extends Component {
    componentDidMount() {
        const { ThumbnailID } = this.props;
        console.log(ThumbnailID);
        fetch(`${URL}api/thumbnail/${ThumbnailID}`, {
            method:"get"
        }).then(res=>this.setState({imageURl:res.url}))
    }
    state={
        imageURl:''
    }
    render() {
        const {imageURl} = this.state;
        return (
<img className='thumbImage' src={imageURl} alt='poster' />
        )
    }
}

export default Thumbnail

