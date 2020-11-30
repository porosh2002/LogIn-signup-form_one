import React,{useState} from 'react'
import { VscAdd} from "react-icons/vsc";
import {useDropzone} from 'react-dropzone'
export default function Dropjone() {
    const [yourImage,setImage]=useState([]);
    const{getRootProps,getInputProps,isDragActive} = useDropzone({
        accept:"video/*",
        onDrop:(acceptedFiles)=>{
            setImage(
                acceptedFiles.map((upFile)=>Object.assign(upFile,{
                    preview:URL.createObjectURL(upFile)
                }))
            )
        }
    })
    return (
<div>
<div {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? <p>Drop Image Here</p> : <p>Select Image</p>}
        </div>
        {
            yourImage.map((upFile,i)=>{
                console.log(upFile)
                return(
                    <div key={i}>
                        <video controls src={upFile.preview} />
                    </div>
                )
            })
        }
</div>
    )
}
