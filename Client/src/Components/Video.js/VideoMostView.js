/* eslint-disable */
import React from "react";
import VideoThumb from "./videoThumb";
export default function Video({ video }) {
  const ViewsArray = [];
  const modifiedData = [];
  const ModifiedDataLatest = [];
  video.map((data) => {
    ViewsArray.push(data.Views)
  })
  ViewsArray.sort(function (a, b) {
    return a - b
  });
  ViewsArray.map((data, i) => {
    video.filter((data2) => {
      if (data === data2.Views) {
        modifiedData.push(data2)
      }
    })
  })
  let uniqueChars = [...new Set(modifiedData)];
  const Formate_Data = () => {
    for (var i = uniqueChars.length; i > -1; i--) {
      if (uniqueChars[i] !== undefined) {
        ModifiedDataLatest.push(uniqueChars[i]);
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
