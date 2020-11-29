import React from 'react'
import {DropInput} from '../../Styled'
export default function Dropjone({...other}) {
    return (
<DropInput {...other}  type='file'/>
    )
}
