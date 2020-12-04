import React, { PureComponent } from "react";
import DropZone from "../Components/Dropzone/Dropjone";
import {URL} from '../serverUrl';
import { v4 as uuidv4 } from 'uuid';
import { DIVUPLOAD, Input, TextArea, Button } from "../Styled";
export class Upload extends PureComponent {
  state = {
    Video: "",
    Title: "",
    Des: "",
  };
  OnFileUpload = (e) => {
    this.setState({ Video: e[0] });
  };
  OnTextUpload = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  UploadFile=e=>{
    const ImageID = uuidv4();
      const {Video,
        // Title,Des
      }=this.state;
    const formData = new FormData();
    formData.append("upload",Video);
    fetch(`${URL}api/Video/${ImageID}`, {
      method: "POST",
      body: formData,
    })
  }
  render() {
    return (
        <DIVUPLOAD>
        <p className="title title-b">Upload Video</p>
        <div style={{ margin: "100px 0px 50px 0px" }}>
          <DropZone onChange={this.OnFileUpload}/>
        </div>
        <Input
          onChange={this.OnTextUpload}
          name="Title"
          type="text"
          placeholder="Enter Your Video Title"
          style={{ width: "700px" }}
        />
        <TextArea
          onChange={this.OnTextUpload}
          name="Des"
          type="text"
          placeholder="Enter Your Video Title"
        />
        <Button onClick={this.UploadFile} type="submit" />
        </DIVUPLOAD>
    );
  }
}

export default Upload;
