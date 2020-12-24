import React from 'react'
import {EDIV,Modal} from '../../Styled'
export default function LoginSuccess({ message0, message1 }) {
    return (
        <div className='LogoutDIV'>
        <p>{message0}<span className='color-green'>{message1}</span></p>
    </div>
    )
}