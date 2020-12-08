import React,{useState} from 'react'
import {useDropzone} from 'react-dropzone';
export default function Dropjone({onChange}) {
    const [yourImage,setImage]=useState([]);
    const{getRootProps,getInputProps,isDragActive} = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
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
<div className='DropDivImage' {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? <div className='dropsignImage'>drop thumbnail</div> :<div className='dropsignImage'>select thumbnail</div>}
        </div>
        {
            yourImage.map((upFile,i)=>{
                return(
                    <div className='VideoDiv' key={i}>
                    <img className='border-image-up' src={upFile.preview} width='300' />
                    </div>
                )
            })
        }
</div>
    )
}
