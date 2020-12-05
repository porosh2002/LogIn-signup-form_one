import React, { PureComponent } from "react";
import DropZone from "../Components/Dropzone/Dropjone";
import {URL} from '../serverUrl';
import Error from '../Components/Error/Error'
import axios from 'axios';
import { DIVUPLOAD, Input, TextArea, Button } from "../Styled";
export class Upload extends PureComponent {
  state = {
    Video: "",
    Title: "",
    Des: "",
    fileName:'',
    filePath:'',
    errorHappend:false
  };
  OnFileUpload = (e) => {
    this.setState({ Video: e[0] });
    const formData = new FormData();
  const config = {
    header: { 'content-type': 'multipart/form-data' }
}
  formData.append("file",this.state.Video);
  axios.post(`${URL}api/Video`, formData, config).then(response=>{
    if (response.data.success) {
      let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName
        }
        this.setState({filePath:variable.filePath,fileName:variable.fileName})
    }
    else{
      this.setState({errorHappend:true})
    }
  })
  };
  OnTextUpload = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  UploadFile=e=>{
    const {
      Title,Des,fileName,filePath
    }=this.state;

    if(Title.length !== 0 && Des.length !== 0 && fileName.length !== 0 && filePath.length !== 0){
      fetch(`${URL}api/VideoData`,{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Title,Des,fileName,filePath
        }),
      }).then(res=>{
        if(res.status===200){
          alert("video uploaded")
        }
      })
    }
    else{
      alert('something missing')
    }
  }
  render() {
    const { errorHappend } = this.state;
    const styleError = errorHappend ? null : { display: "none" };
    return (
<div>
<div style={styleError}>
<Error />
</div>
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
</div>
    );
  }
}

export default Upload;
