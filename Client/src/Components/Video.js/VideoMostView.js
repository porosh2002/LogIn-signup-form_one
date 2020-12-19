import React from "react";
import VideoThumb from "./videoThumb";
export default function Video({ video }) {
  const ViewsArray = [];
  const ModifiedData = [];
  video.map((data, i) => {
    return ViewsArray.push(data.Views);
  });
  ViewsArray.sort(function (a, b) {
    return b - a;
  });
  // Modifing Data
  if (ModifiedData.length !== ViewsArray) {
    for (var i = 0; i < ViewsArray.length; i++) {
      for (var j = 0; j < ViewsArray.length; j++) {
        if (ViewsArray[i] === video[j].Views) {
          ModifiedData.push(video[j]);
        }
      }
    }
  }
  return (
    <div>
      {ModifiedData.map((data, i) => {
        return <VideoThumb VideoData={data} key={i} />;
      })}
    </div>
  );
}
