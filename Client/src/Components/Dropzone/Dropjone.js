import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { VscAdd} from "react-icons/vsc";
const onDrop = ( files ) => {
    console.log(files[0])
}
export default class Dropjone extends Component {
    render() {
        return (
                <Dropzone 
onDrop={onDrop}
multiple={false}
maxSize={800000000}>
{({ getRootProps, getInputProps }) => (
    <div className='DropDiv'
        {...getRootProps()}
    >
        <input {...getInputProps()} />
        <div className='icon-drop'><VscAdd /></div>

    </div>
)}
</Dropzone>
        )
    }
}
