import React from 'react'
import Thumbnail from './Thumbnail'
export default function videoThumb({VideoData}) {
    const {ThumbnailID,Title} = VideoData;
    return (
        <div>
            <Thumbnail ThumbnailID={ThumbnailID} />
        </div>
    )
}
