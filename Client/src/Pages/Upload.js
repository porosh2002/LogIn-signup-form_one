import React, { PureComponent } from 'react'
import DropZone from '../Components/Dropzone/Dropjone'
import {DIVUPLOAD,Input,TextArea,Button} from '../Styled'
export class Upload extends PureComponent {
    render() {
        return (
            <DIVUPLOAD>
            <p className='title title-b'>Upload Video</p>
            <div style={{margin:"100px 0px 50px 0px"}}><DropZone /></div>
            <Input type='text' placeholder='Enter Your Video Title' style={{width:'700px'}}/>
            <TextArea type='text' placeholder='Enter Your Video Title'/>
            <Button type='submit'/>
            </DIVUPLOAD>
        )
    }
}

export default Upload
