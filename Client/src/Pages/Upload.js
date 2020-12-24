import React, { PureComponent } from "react";
import DropZone from "../Components/Dropzone/Dropjone";
import DropThumb from "../Components/Dropzone/DropThumb";
import { URL } from "../serverUrl";
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { DIVUPLOAD, Input, TextArea, Button } from "../Styled";
const config = {
  header: { "content-type": "multipart/form-data" },
};
export class Upload extends PureComponent {
  state = {
    Video: "",
    Title: "",
    Des: "",
    fileName: "",
    filePath: "",
    Thumbnail: "",
    UploaderName: "unknown",
    UploadDetails: null
  };
  OnFileUpload = (e) => {
      this.setState({ UploadDetails: moment().format('MMMM Do YYYY') })
    this.setState({ Video: e[0] });
    const formData = new FormData();
    formData.append("file", this.state.Video);
    axios.post(`${URL}api/Video`, formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        this.setState({
          filePath: variable.filePath,
          fileName: variable.fileName,
        });
      } else {
        this.setState({ errorHappend: true });
      }
    });
  };
  OnThumbSelect = (e) => {
    this.setState({ Thumbnail: e[0] });
  };
  OnTextUpload = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  UploadFile = (e) => {
      const { Title, Des, fileName, filePath, Thumbnail, UploaderName, UploadDetails } = this.state;

      if (
        Title.length !== 0 &&
        Des.length !== 0 &&
        fileName.length !== 0 &&
        filePath.length !== 0 &&
        Thumbnail.length !== 0
      ) {
        const ThumbnailID = uuidv4();
        fetch(`${URL}api/VideoData`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Title,
            Des,
            fileName,
            filePath,
            ThumbnailID,
            UploaderName,
            UploadDetails
          }),
        }).then((res) => {
          if (res.status === 200) {
            const formData = new FormData();
  
            formData.append("Thumbnail", this.state.Thumbnail);
            axios
              .post(`${URL}api/Thumb/${ThumbnailID}`, formData, config)
              .then((response) => {
                if (response.status === 200) {
                  alert("Video Uploaded");
                } else {
                  this.setState({ errorHappend: true });
                }
              });
          }
        });
      } else {
        alert("something missing");
      }
  };
  render() {
    return (
      <div>
        <DIVUPLOAD>
          <p className="title title-b">Upload Video</p>
          <div style={{ margin: "20px 0px" }}>
            <DropZone onChange={this.OnFileUpload} />
          </div>
          <p className="title title-b">Upload Thumbnail</p>
          <div style={{ margin: "20px 0px" }}>
            <DropThumb onChange={this.OnThumbSelect} />
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
          <Input
            onChange={(e) => { this.setState({ UploaderName: e.target.value }) }}
            placeholder="Enter video uploader name"
            style={{ width: "700px" }}
          />
          <Button onClick={this.UploadFile} type="submit" />
        </DIVUPLOAD>
      </div>
    );
  }
}

export default Upload;
