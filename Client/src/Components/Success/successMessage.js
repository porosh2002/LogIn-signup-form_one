import React from 'react'
import {EDIV,Modal} from '../../Styled'
export default function LoginSuccess({ message0, message1 }) {
    return (
        <EDIV>
        <Modal className='modal-box ab-p-50'>
        <div>
        </div>
        <p style={{width:"80%",fontSize:'1.4rem',textAlign:"center"}} className='ab-p-50 title-w'>{message0}<span className='color-green'>{message1}</span></p>
        </Modal>
    </EDIV>
    )
}