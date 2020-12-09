
import React, { PureComponent } from 'react'
import {URL} from '../../serverUrl'

export class Thumbnail extends PureComponent {
    componentDidMount() {
        const {ThumbnailID} = this.props;
        fetch(`${URL}api/thumbnail/${ThumbnailID}`).then(res=>{
            this.setState({imageURl:res.url})
        })
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

