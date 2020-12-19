import React from "react";
import VideoThumb from "./videoThumb";
export default function Video({ video }) {
    const ModifiedDataLatest = [];
    const Formate_Data = () => {
        for (var i = video.length; i > -1; i--) {
            if (video[i] !== undefined) {
                ModifiedDataLatest.push(video[i]);
            }
        }
    };
    Formate_Data();
    return (
        <div>
            {ModifiedDataLatest.map((data, i) => {
                return <VideoThumb VideoData={data} key={i} />;
            })}
        </div>
    );
}
