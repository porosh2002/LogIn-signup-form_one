import React, { PureComponent } from 'react'
import DropZone from '../Components/Dropzone/Dropjone'
import {DIVUPLOAD} from '../Styled'
export class Upload extends PureComponent {
    render() {
        return (
            <DIVUPLOAD>
            <p className='title title-b'>Upload Video</p>
                <DropZone />
            </DIVUPLOAD>
        )
    }
}

export default Upload
