import React from 'react'
import VideoThumb from './videoThumb'
export default function Video({video}) {
    return (
        <div>
            {video.map((data,i)=>{
                return <VideoThumb VideoData={data} key={i} />
            })}
        </div>
    )
}
