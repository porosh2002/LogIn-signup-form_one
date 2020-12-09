import React from 'react'
import Thumbnail from './Thumbnail';
import {Link} from 'react-router-dom'
export default function videoThumb({VideoData}) {
    const {ThumbnailID,Title,_id} = VideoData;
    return (
        <Link className='thumbLink' to={`/video/${_id}`}>
            <Thumbnail ThumbnailID={ThumbnailID} />
            <p>{Title}</p>
        </Link>
    )
}
