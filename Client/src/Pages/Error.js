import React from "react";
import ErrorImage from "../Images/error.svg";
import {Div,EImage} from '../Styled'
export default function Error() {
  return (
    <Div>
      <p className="title title-b">
        request <span className="color-oranged">not</span> found !
      </p>
      <EImage alt="not-found" src={ErrorImage} />
    </Div>
  );
}
