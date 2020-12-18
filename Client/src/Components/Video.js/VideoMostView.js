import React from "react";
import VideoThumb from "./videoThumb";
export default function Video({ video }) {
  const ViewsArray = [];
  const newViewsArray = [];
  const VideoArray = [];
  video.map((data) => {
    ViewsArray.push(Number(data.Views));
  });
  if (ViewsArray.length !== 0) {
      for (var i = 0; i < ViewsArray.length; i++) {
        for (var j = 0; j < ViewsArray.length; j++){
            if (ViewsArray[i] === ViewsArray[j] || ViewsArray[i] > ViewsArray[j]) {
                console.log(ViewsArray[i]);
            }
        }
      }
  }
  console.log(newViewsArray);
  return (
    <div>
      {/* {video.map((data,i)=>{
                return <VideoThumb VideoData={data} key={i} />
            })} */}
    </div>
  );
}
