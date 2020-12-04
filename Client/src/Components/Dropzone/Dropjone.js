import React,{useState} from 'react'
import { VscAdd,VscSignIn} from "react-icons/vsc";
import poster from '../../Images/poster.jpg'
import {useDropzone} from 'react-dropzone';
export default function Dropjone({onChange}) {
    const [yourImage,setImage]=useState([]);
    const{getRootProps,getInputProps,isDragActive} = useDropzone({
        accept:"video/*",
        onDrop:(acceptedFiles)=>{
            onChange(acceptedFiles);
            setImage(
                acceptedFiles.map((upFile)=>Object.assign(upFile,{
                    preview:URL.createObjectURL(upFile)
                }))
            )
        }
    })
    return (
<div>
<div className='DropDiv' {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? <div className='dropsign'><VscSignIn /></div> :<div className='dropsign'><VscAdd /></div>}
        </div>
        {
            yourImage.map((upFile,i)=>{
                return(
                    <div className='VideoDiv' key={i}>
                    <video poster={poster} controls src={upFile.preview} width='300' />
                    </div>
                )
            })
        }
</div>
    )
}
