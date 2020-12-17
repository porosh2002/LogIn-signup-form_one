import React from 'react'
import Thumbnail from './Thumbnail';
import { Link } from 'react-router-dom'
export default function videoThumb({ VideoData }) {
    const { ThumbnailID, Title, _id, UploaderName, UploadDetails } = VideoData;
    return (
        <Link className='thumbLink' to={`/video/${_id}`}>
            <Thumbnail ThumbnailID={ThumbnailID} />
            <div className='videoDetails'>
                <p style={{ margin: "0px" }}>{UploadDetails}</p>
                <p style={{ margin: "0px" }}>{UploaderName}</p>
            </div>
            <p>{Title}</p>
        </Link>
    )
}
